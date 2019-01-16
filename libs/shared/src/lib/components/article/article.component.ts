import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from '../../services/http/article.service';
import { ArticleExtended } from '../../models/article-extended';
import { switchMap, take, map } from 'rxjs/operators';
import { Article, Picture } from '../../models';
import { CommentService, AntTranslateService } from '../../services';
import { Observable } from 'rxjs';
import { english, spanish, french } from './i18n';
import { fadeInItems } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'ant-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  relatedArticles: Article[];
  article: ArticleExtended;
  articleMainPicture: Picture;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location,
    private commentService: CommentService,
    private router: Router,
    public translate: AntTranslateService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    this.translate.loadTranslations(english, spanish, french);
  }

  ngOnInit() {
    // Setting the changeDetector to detect when is on mobile
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

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
    this.articleService.getWithTags(id).subscribe(art => {
      art.body = this.addStyleToArticleImages(art.body);
      this.article = art;
      this.articleMainPicture = this.article.mainPicture;
    });
  }

  onSelectTag(tagId: number): void {}

  /**
   *  Get the related articles of the current article.
   */
  getRelatedArticles(id: number): void {
    this.articleService.getRelatedArticles(id).subscribe(items => {
      items.forEach(a => {
        // a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '');
        a.title = a.title.replace(/<\/?[^>]+(>|$)/g, '');
      });
      this.relatedArticles = items.slice(0, this.isMobile() ? 1 : 3);
    });
  }

  addStyleToArticleImages(articleBody: string): string {
    const toReplaceWith = '<img style="margin-top: 5%; margin-bottom: 5%;" src';
    const toReplace = '<img src';
    let imgTagIndex = articleBody.indexOf(toReplace);

    while (imgTagIndex !== -1) {
      articleBody = articleBody.replace(toReplace, toReplaceWith);
      imgTagIndex = articleBody.indexOf(toReplace);
    }

    return articleBody;
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }
}
