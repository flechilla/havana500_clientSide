import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import {
  Article,
  IndexesCircularLinkedList,
  antAnimations,
  ArticleService
} from '@hav500workspace/shared';
import { Observable, interval } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hav-outstanding-curiosities',
  templateUrl: 'outstanding-curiosities.component.html',
  styleUrls: ['outstanding-curiosities.component.scss'],
  animations: antAnimations
})
export class OutstandingCuriositiesComponent implements OnInit, OnDestroy {
  @Input()
  totalItems: number = 8;
  public curiosities$: Observable<Article[]>;

  private visibleIndexes: IndexesCircularLinkedList;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    protected articleService: ArticleService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    //Sets the media query listener
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.curiosities$ = this.articleService.getArticlesBasicDataBySectionName(
      'deportes',
      0,
      this.totalItems
    );

    this.visibleIndexes = new IndexesCircularLinkedList(this.totalItems);

    this.slideCuriosities();
  }

  public get current(): number {
    return this.visibleIndexes.current;
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  moveNext() {
    this.visibleIndexes.moveNext();
  }

  slideCuriosities() {
    interval(7000)
      .pipe(
        map(() => {
          console.log('is workng');

          this.moveNext();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
