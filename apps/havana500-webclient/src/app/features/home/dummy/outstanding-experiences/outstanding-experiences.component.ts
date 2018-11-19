import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  Article,
  IndexesCircularLinkedList,
  ArticleService
} from '@hav500workspace/shared';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'hav-outstanding-experiences',
  templateUrl: 'outstanding-experiences.component.html',
  styleUrls: ['outstanding-experiences.component.scss']
})
export class OutstandingExperiencesComponent implements OnInit, OnDestroy {
  @Input()
  totalItems: number = 8;
  public experiences$: Observable<Article[]>;

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
    this.experiences$ = this.articleService.getArticlesBasicDataBySectionName(
      'deportes',
      0,
      this.totalItems
    );

    this.visibleIndexes = new IndexesCircularLinkedList(this.totalItems);
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
  }

  movePrevious() {
    this.visibleIndexes.moveBack();
  }

  public get current(): number {
    return this.visibleIndexes.current;
  }
  public get predecessor(): number {
    return this.visibleIndexes.predecessor;
  }
  public get successor(): number {
    return this.visibleIndexes.successor;
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
