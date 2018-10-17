import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from '../../services/http/article.service';
import { ArticleExtended } from '../../models/article-extended';
import { switchMap } from 'rxjs/operators';
import { Article } from '../../models';
import { CommentService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'ant-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  relatedArticles$: Observable<Article[]>;
  article$: Observable<ArticleExtended>;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id: number = +params.get('id');
      this.getArticle(id);
      this.getRelatedArticles(id);
    });
  }

  /**
   *  Get the article with the given articleId that is in the route.
   */
  getArticle(id: number): void {
    this.article$ = this.articleService.getWithTags(id);
  }

  onSelectTag(tagId: number): void {
    console.log(
      'this method hits after the user selelects a tag. the tag Id is: ' +
        tagId
    );
  }

  /**
   *  Get the related articles of the current article.
   */
  getRelatedArticles(id: number): void {
    this.relatedArticles$ = this.articleService.getRelatedArticles(id);
  }
}
