import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Article } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/http/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ant-create-update-article',
  templateUrl: 'create-update-article.component.html'
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
        Id: 0,
        SectionId: 0,
        Title: ['', Validators.required],
        Body: ['', Validators.required],
        AllowComments: true,
        AllowAnonymousComments: false,
        StartDateUtc: '',
        EndDateUtc: '',
        MetaKeywords: '',
        MetaDescription: '',
        MetaTitle: ''
      })
    });
  }

  protected save() {
    this.dialogRef.close(this.form.get('article').value);
  }
}
