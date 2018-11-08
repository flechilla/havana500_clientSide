import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { Observable, BehaviorSubject, of, interval } from 'rxjs';
import {
  Article,
  ArticleService,
  antAnimations
} from '@hav500workspace/shared';
import {
  combineLatest,
  map,
  switchMap,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'hav-outstanding-general-articles',
  templateUrl: 'outstanding-general-articles.component.html',
  styleUrls: ['outstanding-general-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: antAnimations,
  encapsulation: ViewEncapsulation.None
})
export class OutstandingGeneralArticlesComponent implements OnInit {
  @Input()
  totalItems: number;

  @Input()
  carouselTime: number = 3000;

  protected topArticles$: Observable<Article[]>;
  protected currentArticle$: Observable<Article>;

  protected currentIndex$: BehaviorSubject<number> = new BehaviorSubject(0);

  protected articles: Article[];

  constructor(protected articleService: ArticleService) {}

  ngOnInit() {
    this.topArticles$ = this.articleService.getArticlesBasicDataBySectionName(
      'deportes',
      0,
      this.totalItems
    );

    this.topArticles$.subscribe(resp => {
      this.articles = resp;
    });

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
}
