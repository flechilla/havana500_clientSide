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
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

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
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    protected articleService: ArticleService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef
  ) {
    iconRegistry.addSvgIcon(
      'arrow',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/arrow.svg')
    );

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
    console.log(this.visibleIndexes.predecessor);
    console.log(this.visibleIndexes.current);
    console.log(this.visibleIndexes.successor);
  }

  isIndexVisible(index: number) {
    return (
      index === this.visibleIndexes.current ||
      (!this.isMobile() && index === this.visibleIndexes.successor) ||
      (!this.isMobile() && index === this.visibleIndexes.predecessor)
    );
  }

  moveNext() {
    this.visibleIndexes.moveNext();
    console.log(this.visibleIndexes.predecessor);
    console.log(this.visibleIndexes.current);
    console.log(this.visibleIndexes.successor);
  }

  movePrevious() {
    this.visibleIndexes.moveBack();
    console.log(this.visibleIndexes.predecessor);
    console.log(this.visibleIndexes.current);
    console.log(this.visibleIndexes.successor);
  }

  public get current(): number {
    return this.visibleIndexes.current;
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
