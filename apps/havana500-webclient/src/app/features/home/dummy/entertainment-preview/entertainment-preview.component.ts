import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Observable, pipe } from 'rxjs';
import {
  Article,
  ArticleService,
  AntTranslateService
} from '@hav500workspace/shared';
import { MediaMatcher } from '@angular/cdk/layout';
import { map, tap } from 'rxjs/operators';
import { english, spanish, french } from './i18n';

@Component({
  selector: 'hav-entertainment-preview',
  templateUrl: 'entertainment-preview.component.html',
  styleUrls: ['entertainment-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntertainmentComponent implements OnInit, OnDestroy {
  protected sportArticles: Observable<Article[]>;
  protected literatureArticles: Observable<Article[]>;
  protected cultureArticles: Observable<Article[]>;
  protected cinemaArticles: Observable<Article[]>;
  protected articles: Observable<Article[]>;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private articleService: ArticleService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    public translate: AntTranslateService
  ) {
    this.translate.loadTranslations(english, spanish, french);
  }

  ngOnInit() {
    // Setting the changeDetector to detect when is on mobile
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.getElements();

    this.translate.translate.onLangChange.subscribe(x=>{
      this.translate
      .useLanguage(this.translate.translate.currentLang)
      .subscribe(_=>{
          this.getElements();
      });
    });
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getElements(){
    this.articles = this.articleService
      .getArticlesBasicDataBySectionName('entretenimiento', 0, 4)
      .pipe(
        map(resp => {
        resp.forEach(a => {     /*a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '');*/     a.title = a.title.replace(/<\/?[^>]+(>|$)/g, ''); });
          if (this.isMobile()) {
            return resp.slice(0, 1);
          } else {
            return resp;
          }
        })
      );

    // this.sportArticles = this.articleService
    //   .getArticlesBasicDataBySectionName('deportes', 0, 4)
    //   .pipe(
    //     map(resp => {
    //       resp.forEach(a => {     a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '');     a.title = a.title.replace(/<\/?[^>]+(>|$)/g, ''); });
    //       if (this.isMobile()) {
    //         return resp.slice(0, 1);
    //       } else {
    //         return resp;
    //       }
    //     })
    //   );

    // this.cultureArticles = this.articleService
    //   .getArticlesBasicDataBySectionName('cultura', 0, 4)
    //   .pipe(
    //     map(resp => {
    //       resp.forEach(a => {     a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '');     a.title = a.title.replace(/<\/?[^>]+(>|$)/g, ''); });
    //       if (this.isMobile()) {
    //         return resp.slice(0, 1);
    //       } else {
    //         return resp;
    //       }
    //     })
    //   );

    // this.literatureArticles = this.articleService
    //   .getArticlesBasicDataBySectionName('literatura', 0, 4)
    //   .pipe(
    //     map(resp => {
    //       resp.forEach(a => {     a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '');     a.title = a.title.replace(/<\/?[^>]+(>|$)/g, ''); });
    //       if (this.isMobile()) {
    //         return resp.slice(0, 1);
    //       } else {
    //         return resp;
    //       }
    //     })
    //   );
  }
}
