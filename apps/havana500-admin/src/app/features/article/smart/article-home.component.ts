import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  Input,
  AfterViewInit
} from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatInput,
  MatDialog
} from '@angular/material';
import { Observable, BehaviorSubject, from, merge } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { antAnimations } from '../../../shared/utils/animations';
import { Article } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/http/article.service';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { BaseDataSource } from '../../../shared/utils/base-data-source';
import { CreateUpdateArticleComponent } from '../dummy/create-update-article.component';
import { BaseTableContainerComponent } from '../../../shared/components/base-table-container.component';

@Component({
  selector: 'ant-article-home',
  templateUrl: 'article-home.component.html',
  styleUrls: ['article-home.component.scss'],
  animations: [antAnimations]
  // encapsulation: ViewEncapsulation.None
})
export class ArticleHomeComponent extends BaseTableContainerComponent<Article>
  implements OnInit, AfterViewInit {
  protected dialogRef: any;

  constructor(
    private articleService: ArticleService,
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

    this.dataSource.Data$.subscribe(resp => console.log(resp));
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  openCreateDialog(articleToEdit?: Article) {
    this.dialogRef = this.dialog.open(CreateUpdateArticleComponent, {
      panelClass: 'article-form-dialog',
      data: articleToEdit ? articleToEdit : null
    });

    this.dialogRef.afterClosed().subscribe((response: Article) => {
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
