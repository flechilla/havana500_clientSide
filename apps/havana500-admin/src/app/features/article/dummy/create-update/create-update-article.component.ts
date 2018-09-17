import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Article } from '../../../../core/models/article.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Section } from '../../../../core/models/section.model';
import { Observable } from 'rxjs';
import { antAnimations } from '../../../../shared/utils/animations';
import { ArticleExtended } from '../../../../core/models/article-extended';

@Component({
  selector: 'ant-create-update-article',
  templateUrl: 'create-update-article.component.html',
  styleUrls: ['create-update-article.component.scss'],
  animations: antAnimations,
  encapsulation: ViewEncapsulation.None
})
export class CreateUpdateArticleComponent implements OnInit {
  protected form: FormGroup;
  protected onEdit = false;

  protected sections: Section[];

  protected article: ArticleExtended;

  constructor(
    protected fb: FormBuilder,
    protected dialogRef: MatDialogRef<CreateUpdateArticleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { article$: Observable<ArticleExtended>; sections: Section[] }
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
}
