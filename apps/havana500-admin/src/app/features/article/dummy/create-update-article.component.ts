import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Article } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/http/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { antAnimations } from '../../../shared/utils/animations';

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

  constructor(
    protected fb: FormBuilder,
    protected dialogRef: MatDialogRef<CreateUpdateArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article
  ) {}

  ngOnInit() {
    if (this.data) {
      this.onEdit = true;
    }

    this.loadForm();

    if (this.onEdit) {
      this.form.get('article').patchValue(this.data);
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
