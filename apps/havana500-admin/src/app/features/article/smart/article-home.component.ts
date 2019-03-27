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
        'title',
        'section',
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
          : this.articleService.createTemporaryArticle(),
        sections: this.sections,
        tags: this.globalTags,
        isTemporary: articleToEdit == null
      }
    });

    this.dialogRef
      .afterClosed()
      .subscribe(
        (response: { update: Boolean; data: ArticleExtended | number }) => {
          this.loadPage();
          if (!response) {
            return;
          } else if (!response.update) {
            this.articleService.delete(response.data).subscribe();
          } else {
            this.service
              .update(
                (response.data as ArticleExtended).id,
                response.data as ArticleExtended
              )
              .subscribe();
          }
        }
      );
  }
}
