import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { Article } from '../../../../core/models/article.model';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatMenuTrigger
} from '@angular/material';
import { Section } from '../../../../core/models/section.model';
import { Observable } from 'rxjs';
import { antAnimations } from '../../../../shared/utils/animations';
import { ArticleExtended } from '../../../../core/models/article-extended';
import { ContentTag } from '../../../../core/models/content-tag.model';
import { ContentTagService } from '../../../../core/services/http/content-tag.service';
import { AntUtilsService } from '../../../../core/services/ant-utils.service';

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

  protected form: FormGroup;
  protected onEdit = false;

  protected sections: Section[];

  protected article: ArticleExtended;

  constructor(
    protected fb: FormBuilder,
    protected dialogRef: MatDialogRef<CreateUpdateArticleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { article$: Observable<ArticleExtended>; sections: Section[] },
    protected contentTagService: ContentTagService,
    protected utilsService: AntUtilsService
  ) {}

  ngOnInit() {
    this.loadForm();

    if (!this.data) {
      console.error(
        'Data passed to dialog must not be empty and must have a list of Sections'
      );
    }
    this.sections = this.data.sections;

    if (this.data.article$) {
      this.onEdit = true;
    }

    if (this.onEdit) {
      this.data.article$.subscribe(art => {
        console.log(art);

        this.form.get('article').patchValue(art);
        this.article = art;
      });
    }
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
    this.dialogRef.close(this.form.get('article').value);
  }

  protected addTag(tagForm: NgForm) {
    const toCreateTag = tagForm.value;
    toCreateTag.id = this.utilsService.generateUEId();

    this.article.tags.push(toCreateTag);

    this.contentTagService.create(toCreateTag).subscribe(
      createdTag => {
        const indexOfOld = this.article.tags.findIndex(
          tag => tag.id === toCreateTag.id
        );
        this.article.tags.splice(indexOfOld, 1, createdTag);
      },
      error => {
        const indexOfOld = this.article.tags.findIndex(
          tag => tag === toCreateTag
        );
        this.article.tags.splice(indexOfOld, 1);
      }
    );

    tagForm.resetForm();
    this.tagMenu.closeMenu();
  }

  protected onTagMenuOpened() {
    this.tagNameField.nativeElement.focus();
  }

  protected deleteArticleTag(id: any) {
    const index = this.article.tags.findIndex(tag => tag.id === id);
    const toDelete = this.article.tags.splice(index, 1);
    // this.
  }
}
