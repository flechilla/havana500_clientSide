import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ArticleService } from '@hav500workspace/shared';

@Component({
  selector: 'hav-entertainment-preview',
  templateUrl: 'entertainment-preview.component.html'
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
      8
    );
    this.sportArticles = this.articleService.getArticlesBasicDataBySectionName(
      'deportes',
      0,
      8
    );
    this.cultureArticles = this.articleService.getArticlesBasicDataBySectionName(
      'cultura',
      0,
      8
    );
    this.literatureArticles = this.articleService.getArticlesBasicDataBySectionName(
      'literatura',
      0,
      8
    );
  }
}
