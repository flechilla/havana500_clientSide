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
  ArticleService,
  AntTranslateService
} from '@hav500workspace/shared';
import { Observable, interval } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { english, spanish, french } from './i18n';

@Component({
  selector: 'hav-outstanding-curiosities',
  templateUrl: 'outstanding-curiosities.component.html',
  styleUrls: ['outstanding-curiosities.component.scss'],
  animations: antAnimations
})
export class OutstandingCuriositiesComponent implements OnInit, OnDestroy {
  @Input()
  totalItems: number = 8;
  public curiosities: Article[];

  private visibleIndexes: IndexesCircularLinkedList;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    protected articleService: ArticleService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    public translate: AntTranslateService
  ) {
    //Sets the media query listener
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.translate.loadTranslations(english, spanish, french);
  }

  ngOnInit() {
     this.articleService.getArticlesBasicDataBySectionName(
      'deportes',
      0,
      this.totalItems          
          ).subscribe(resp =>  
            {
              resp.forEach(a => {     a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '');     a.title = a.title.replace(/<\/?[^>]+(>|$)/g, ''); })
              this.curiosities = resp;
            }
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
          this.moveNext();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
