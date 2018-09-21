import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
  FormControl
} from '@angular/forms';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatMenuTrigger,
  MatInput
} from '@angular/material';
import { Section } from '../../../../core/models/section.model';
import { Observable } from 'rxjs';
import { antAnimations } from '../../../../shared/utils/animations';
import { ArticleExtended } from '../../../../core/models/article-extended';
import { ContentTag } from '../../../../core/models/content-tag.model';
import { ContentTagService } from '../../../../core/services/http/content-tag.service';
import { AntUtilsService } from '../../../../core/services/ant-utils.service';
import { Entity } from '../../../../shared/models/entity.models';
import { startWith, map } from 'rxjs/operators';
import { Article } from '../../../../core/models/article.model';
import { ArticleService } from '../../../../core/services/http/article.service';

@Component({
  selector: 'ant-create-update-article',
  templateUrl: 'create-update-article.component.html',
  styleUrls: ['create-update-article.component.scss'],
  animations: antAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CreateUpdateArticleComponent implements OnInit {
  @ViewChild('tagMenuTrigger')
  tagMenu: MatMenuTrigger;
  @ViewChild('tagNameField')
  tagNameField: ElementRef;
  @ViewChild('tagName')
  tagName: FormControl;

  protected form: FormGroup;
  protected onEdit = false;

  protected sections: Section[];

  protected globalTags: ContentTag[];

  protected article: ArticleExtended;

  filteredTags: Observable<ContentTag[]>;

  constructor(
    protected fb: FormBuilder,
    protected dialogRef: MatDialogRef<CreateUpdateArticleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      article$: Observable<ArticleExtended>;
      sections: Section[];
      tags: ContentTag[];
    },
    protected contentTagService: ContentTagService,
    protected utilsService: AntUtilsService,
    protected articleService: ArticleService
  ) {}

  ngOnInit() {
    this.loadForm();

    if (!this.data) {
      console.error(
        'Data passed to dialog must not be empty and must have a list of Sections and a list of ContentTag'
      );
    }
    this.sections = this.data.sections;

    this.globalTags = this.data.tags;

    if (this.data.article$) {
      this.onEdit = true;
    }

    if (this.onEdit) {
      this.data.article$.subscribe(art => {
        this.form.get('article').patchValue(art);
        this.article = art;
      });
    }

    this.filteredTags = this.tagName.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTags(value))
    );
  }

  protected loadForm() {
    this.form = this.fb.group({
      article: this.fb.group({
        id: 0,
        sectionId: 0,
        title: ['', Validators.required],
        body: ['', Validators.required],
        allowComments: true,
        allowAnonymousComments: false,
        startDateUtc: '',
        endDateUtc: '',
        metaKeywords: '',
        metaDescription: '',
        metaTitle: '',
        editorWeight: 0,
        readingTime: 1
      })
    });
  }

  protected save() {
    const toUpdateOrCreate: Article = this.form.get('article').value;

    this.dialogRef.close(toUpdateOrCreate);
  }

  protected addTag(tagForm: NgForm) {
    if (tagForm.value.name.id) {
      const selectedTag: ContentTag = tagForm.value.name;
      if (
        this.article.tags.findIndex(tag => tag.id === selectedTag.id) === -1
      ) {
        //OPtimistic Add Tag
        this.optimisticAddTagToArticle(selectedTag);
      }
    } else {
      const toCreateTag: ContentTag = {
        name: tagForm.value.name.toString(),
        id: this.utilsService.generateUEId()
      };

      this.optimisticCreateAndAddTagToArticle(toCreateTag);
    }

    tagForm.resetForm();
    this.tagMenu.closeMenu();
  }

  private optimisticCreateAndAddTagToArticle(toCreateTag: ContentTag) {
    this.article.tags.push(toCreateTag);
    this.contentTagService.create({ ...toCreateTag, id: 0 }).subscribe(
      createdTag => {
        const indexOfOld = this.article.tags.findIndex(
          tag => tag.id === toCreateTag.id
        );
        this.article.tags.splice(indexOfOld, 1);
        this.optimisticAddTagToArticle(createdTag);
        this.globalTags.push(createdTag);
      },
      error => {
        const indexOfOld = this.article.tags.findIndex(
          tag => tag === toCreateTag
        );
        this.article.tags.splice(indexOfOld, 1);
      }
    );
  }

  private optimisticAddTagToArticle(selectedTag: ContentTag) {
    this.article.tags.push(selectedTag);
    this.articleService
      .addTag(this.article.id, selectedTag.id)
      .subscribe(null, error => {
        const index = this.article.tags.findIndex(
          tag => tag.id === selectedTag.id
        );
        this.article.tags.splice(index, 1);
      });
  }

  protected onTagMenuOpened() {
    this.tagNameField.nativeElement.focus();
  }

  protected deleteArticleTag(tagId: any) {
    const index = this.article.tags.findIndex(tag => tag.id === tagId);
    const toDelete = this.article.tags[index];
    this.article.tags.splice(index, 1);
    this.articleService
      .removeTag(this.article.id, tagId)
      .subscribe(null, error => {
        this.article.tags.splice(index, 0, toDelete);
      });
  }

  protected displayName(tag: ContentTag): string {
    if (tag) return tag.name;
  }

  private _filterTags(value: any): ContentTag[] {
    let filterValue = '';

    if (value && !value.id) {
      filterValue = value.toLowerCase();
    }

    return this.globalTags.filter(tag =>
      tag.name.toLowerCase().includes(filterValue)
    );
  }
}
