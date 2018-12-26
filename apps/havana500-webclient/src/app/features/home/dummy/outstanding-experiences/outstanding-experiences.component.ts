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
  ArticleService,
  AntTranslateService
} from '@hav500workspace/shared';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { english, spanish, french } from './i18n';

@Component({
  selector: 'hav-outstanding-experiences',
  templateUrl: 'outstanding-experiences.component.html',
  styleUrls: ['outstanding-experiences.component.scss']
})
export class OutstandingExperiencesComponent implements OnInit, OnDestroy {
  @Input()
  totalItems: number = 8;
  public experiences$: Observable<Article[]>;

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
    this.experiences$ = this.articleService.getArticlesBasicDataBySectionName(
      'deportes',
      0,
      this.totalItems
    );
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
