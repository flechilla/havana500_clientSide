import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Article, ArticleService } from '@hav500workspace/shared';
import { MediaMatcher } from '@angular/cdk/layout';
import { map, tap } from 'rxjs/operators';

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

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private articleService: ArticleService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Setting the changeDetector to detect when is on mobile
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.cinemaArticles = this.articleService
      .getArticlesBasicDataBySectionName('cine', 0, 4)
      .pipe(
        map(resp => {
          if (this.isMobile()) {
            return resp.slice(0, 1);
          } else {
            return resp;
          }
        })
      );

    this.sportArticles = this.articleService
      .getArticlesBasicDataBySectionName('deportes', 0, 4)
      .pipe(
        map(resp => {
          if (this.isMobile()) {
            return resp.slice(0, 1);
          } else {
            return resp;
          }
        })
      );
    this.cultureArticles = this.articleService
      .getArticlesBasicDataBySectionName('cultura', 0, 4)
      .pipe(
        map(resp => {
          if (this.isMobile()) {
            return resp.slice(0, 1);
          } else {
            return resp;
          }
        })
      );
    this.literatureArticles = this.articleService
      .getArticlesBasicDataBySectionName('literatura', 0, 4)
      .pipe(
        map(resp => {
          if (this.isMobile()) {
            return resp.slice(0, 1);
          } else {
            return resp;
          }
        })
      );
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
