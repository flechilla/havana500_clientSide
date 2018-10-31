import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ArticleService } from '@hav500workspace/shared';

@Component({
  selector: 'hav-entertainment-preview',
  templateUrl: 'entertainment-preview.component.html',
  styleUrls: ['entertainment-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntertainmentComponent implements OnInit {
  protected sportArticles: Observable<Article[]>;
  protected literatureArticles: Observable<Article[]>;
  protected cultureArticles: Observable<Article[]>;
  protected cinemaArticles: Observable<Article[]>;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.cinemaArticles = this.articleService.getArticlesBasicDataBySectionName(
      'cine',
      0,
      6
    );
    this.sportArticles = this.articleService.getArticlesBasicDataBySectionName(
      'deportes',
      0,
      6
    );
    this.cultureArticles = this.articleService.getArticlesBasicDataBySectionName(
      'cultura',
      0,
      6
    );
    this.literatureArticles = this.articleService.getArticlesBasicDataBySectionName(
      'literatura',
      0,
      6
    );
  }
}
