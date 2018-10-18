import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ViewChild,
  ElementRef
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
  MatMenuTrigger
} from '@angular/material';
import { Observable } from 'rxjs';
import {
  antAnimations,
  Section,
  ContentTag,
  ArticleExtended,
  ContentTagService,
  AntUtilsService,
  ArticleService,
  Article
} from '@hav500workspace/shared';
import { startWith, map } from 'rxjs/operators';
import { UploadService } from '../../../../core/services/http/upload.service';

@Component({
  selector: 'admin-create-update-article',
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
  @ViewChild('mainPicture')
  mainPicture;

  public form: FormGroup;
  public onEdit = false;

  public sections: Section[];

  protected globalTags: ContentTag[];

  public article: ArticleExtended;

  protected isTemporary: boolean;

  filteredTags: Observable<ContentTag[]>;

  constructor(
    protected fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateUpdateArticleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      article$: Observable<ArticleExtended>;
      sections: Section[];
      tags: ContentTag[];
      isTemporary: boolean;
    },
    protected contentTagService: ContentTagService,
    protected utilsService: AntUtilsService,
    protected articleService: ArticleService,
    private uploadService: UploadService
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

    this.isTemporary = this.data.isTemporary;

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

  public save() {
    const toUpdateOrCreate: Article = this.form.get('article').value;

    this.dialogRef.close({ update: true, data: toUpdateOrCreate });
  }

  public addTag(tagForm: NgForm) {
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
      () => {
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
      .subscribe(null, () => {
        const index = this.article.tags.findIndex(
          tag => tag.id === selectedTag.id
        );
        this.article.tags.splice(index, 1);
      });
  }

  public onTagMenuOpened() {
    this.tagNameField.nativeElement.focus();
  }

  public deleteArticleTag(tagId: any) {
    const index = this.article.tags.findIndex(tag => tag.id === tagId);
    const toDelete = this.article.tags[index];
    this.article.tags.splice(index, 1);
    this.articleService
      .removeTag(this.article.id, tagId)
      .subscribe(null, () => {
        this.article.tags.splice(index, 0, toDelete);
      });
  }

  public displayName(tag: ContentTag): string {
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

  public addMainPicture(articleId: number): void {
    console.log('image changed');

    const fi = this.mainPicture.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.uploadService.upload(fileToUpload, articleId).subscribe(res => {
        console.log(res);
      });
    }
  }

  public close() {
    if (this.isTemporary) {
      this.dialogRef.close({ update: false, data: this.article.id });
    } else {
      this.dialogRef.close();
    }
  }
}
