import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  AfterViewInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Article } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/http/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { antAnimations } from '../../../shared/utils/animations';
import { Section } from '../../../core/models/section.model';
import { Observable } from 'rxjs';

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

  constructor(
    protected fb: FormBuilder,
    protected dialogRef: MatDialogRef<CreateUpdateArticleComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { article: Article; sections: Section[] }
  ) {}

  ngOnInit() {
    this.loadForm();

    if (!this.data) {
      console.error(
        'Data passed to dialog must not be empty and must have a list of Sections'
      );
    }
    this.sections = this.data.sections;

    if (this.data.article) {
      this.onEdit = true;
    }

    if (this.onEdit) {
      this.form.get('article').patchValue(this.data.article);
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
