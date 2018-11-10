import { Component, OnInit, Input } from '@angular/core';
import {
  Article,
  IndexesCircularLinkedList,
  antAnimations,
  ArticleService
} from '@hav500workspace/shared';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'hav-outstanding-curiosities',
  templateUrl: 'outstanding-curiosities.component.html',
  styleUrls: ['outstanding-curiosities.component.scss'],
  animations: antAnimations
})
export class OutstandingCuriositiesComponent implements OnInit {
  @Input()
  totalItems: number = 8;
  public curiosities$: Observable<Article[]>;

  private visibleIndexes: IndexesCircularLinkedList;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    protected articleService: ArticleService
  ) {
    iconRegistry.addSvgIcon(
      'arrow',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/arrow.svg')
    );
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
      index === this.visibleIndexes.successor ||
      index === this.visibleIndexes.predecessor
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
}
