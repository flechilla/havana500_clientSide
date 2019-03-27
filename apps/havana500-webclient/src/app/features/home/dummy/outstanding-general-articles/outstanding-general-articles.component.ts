import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Observable, BehaviorSubject, of, interval } from 'rxjs';
import {
  Article,
  ArticleService,
  antAnimations,
  AntTranslateService
} from '@hav500workspace/shared';
import {
  combineLatest,
  map,
  switchMap,
  distinctUntilChanged
} from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import { english, spanish, french } from './i18n';

@Component({
  selector: 'hav-outstanding-general-articles',
  templateUrl: 'outstanding-general-articles.component.html',
  styleUrls: ['outstanding-general-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: antAnimations,
  encapsulation: ViewEncapsulation.None
})
export class OutstandingGeneralArticlesComponent implements OnInit, OnDestroy {
  @Input()
  totalItems: number = 5;

  @Input()
  carouselTime: number = 3000;

  public topArticles$: Observable<Article[]>;
  public currentArticle$: Observable<Article>;

  public currentIndex$: BehaviorSubject<number> = new BehaviorSubject(0);

  protected articles: Article[];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    protected articleService: ArticleService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    public translate: AntTranslateService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.translate.loadTranslations(english, spanish, french);
  }

  ngOnInit() {
    this.translate.translate.onLangChange.subscribe(_ => {
      this.getElements();
    });

    this.getElements();

    // this.topArticles$.subscribe(resp => {
    //   this.articles = resp;
    // });

    // ENABLE FOR 1
    // this.currentArticle$ = this.topArticles$.pipe(
    //   combineLatest(this.currentIndex$),
    //   switchMap(([articles, index]) => {
    //     if (articles != null) {
    //       return of(articles[index]);
    //     }
    //   })
    // );

    // ENABLE FOR 1 AND 2
    this.beginTimeSlide();
  }

  private beginTimeSlide() {
    interval(this.carouselTime)
      .pipe(
        combineLatest(this.currentIndex$),
        distinctUntilChanged(
          (x, y) => x[0] === y[0] || (x[0] === y[0] && x[1] === y[1])
        ),
        map(([x, index]) => {
          if (index === this.totalItems - 1) {
            this.currentIndex$.next(0);
          } else {
            this.currentIndex$.next(index + 1);
          }
        })
      )
      .subscribe();
  }

  public setIndex(index) {
    this.currentIndex$.next(index);
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getElements() {
    this.topArticles$ = this.articleService.getArticlesBasicDataBySectionName(
      'general',
      0,
      this.totalItems
    );
  }
}
