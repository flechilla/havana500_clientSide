import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Article, ArticleService } from '@hav500workspace/shared';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'hav-outstanding-general-articles',
  templateUrl: 'outstanding-general-articles.component.html'
})
export class OutstandingGeneralArticlesComponent implements OnInit {
  protected topArticles: Observable<Article[]>;
  protected currentArticle: Observable<Article>;

  protected currentIndex = 0;

  constructor(protected articleService: ArticleService) {}

  ngOnInit() {
    this.topArticles = this.articleService.getArticlesBasicDataBySectionName(
      'deportes',
      0,
      6
    );

    this.currentArticle = this.topArticles.pipe(
      map(articles => articles[this.currentIndex])
    );
  }
}
