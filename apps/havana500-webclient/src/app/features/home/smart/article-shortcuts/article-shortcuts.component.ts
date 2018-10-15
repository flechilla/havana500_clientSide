import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '@hav500workspace/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'hav-article-shortcuts',
  templateUrl: './article-shortcuts.component.html',
  styleUrls: ['./article-shortcuts.component.scss']
})
export class ArticleShortcutsComponent implements OnInit {

  private sportArticles : Observable<Article[]>;
  private literatureArticles : Observable<Article[]>;
  private cultureArticles : Observable<Article[]>;
  private cinemaArticles : Observable<Article[]>;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {

    this.cinemaArticles = this.articleService.getArticlesBasicDataBySectionName('cine', 0, 5);
    this.sportArticles = this.articleService.getArticlesBasicDataBySectionName('deportes', 0, 5);
    this.cultureArticles = this.articleService.getArticlesBasicDataBySectionName('cultura', 0, 5);
    this.literatureArticles = this.articleService.getArticlesBasicDataBySectionName('literatura', 0, 5);

  }

}
