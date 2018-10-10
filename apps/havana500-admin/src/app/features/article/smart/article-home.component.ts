import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  antAnimations,
  Article,
  Section,
  ContentTag,
  ArticleService,
  SectionService,
  ContentTagService,
  ArticleExtended
} from '@hav500workspace/shared';
import { BaseTableContainerComponent } from '../../../shared/components/base-table-container.component';
import { CreateUpdateArticleComponent } from '../dummy/create-update/create-update-article.component';

@Component({
  selector: 'admin-article-home',
  templateUrl: 'article-home.component.html',
  styleUrls: ['article-home.component.scss'],
  animations: [antAnimations]
  // encapsulation: ViewEncapsulation.None
})
export class ArticleHomeComponent extends BaseTableContainerComponent<Article>
  implements OnInit, AfterViewInit {
  protected dialogRef: any;

  private sections: Section[];

  private globalTags: ContentTag[];

  constructor(
    private articleService: ArticleService,
    private sectionsService: SectionService,
    private contentTagService: ContentTagService,
    protected dialog: MatDialog
  ) {
    super(
      [
        'id',
        'title', // 'section',
        'allowComments',
        'allowAnonymousComments',
        'approvedCommentCount',
        'notApprovedCommentCount',
        'views'
      ],
      articleService
    );
    // 'amountOfComments'
  }

  ngOnInit() {
    super.ngOnInit();

    this.sections = [];
    this.globalTags = [];

    this.sectionsService.getAll().subscribe(resp => {
      this.sections = resp;
    });

    this.contentTagService.getAll().subscribe(resp => {
      this.globalTags = resp;
    });
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  openCreateDialog(articleToEdit?: ArticleExtended) {
    this.dialogRef = this.dialog.open(CreateUpdateArticleComponent, {
      panelClass: 'article-form-dialog',
      data: {
        article$: articleToEdit
          ? this.articleService.getWithTags(articleToEdit.id)
          : null,
        sections: this.sections,
        tags: this.globalTags
      }
    });

    this.dialogRef.afterClosed().subscribe((response: ArticleExtended) => {
      if (!response) {
        return;
      }
      if (!articleToEdit) {
        this.service.create(response).subscribe();
      } else {
        this.service.update(response.id, response).subscribe();
      }
    });
  }
}
