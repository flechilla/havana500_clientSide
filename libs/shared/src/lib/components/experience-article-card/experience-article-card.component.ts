import { Observable } from 'rxjs';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Article } from '../../models';
import { IndexesCircularLinkedList } from '../../utils';

@Component({
  selector: 'ant-experience-article-card',
  templateUrl: 'experience-article-card.component.html',
  styleUrls: ['experience-article-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExperienceArticleCardComponent implements OnInit {
  @Input() public articles$: Observable<Article[]>;
  @Input() public isMobile: boolean;
  @Input() public totalItems: number;

  private visibleIndexes: IndexesCircularLinkedList;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'arrow',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/arrow.svg')
    );
  }

  ngOnInit() {
    this.visibleIndexes = new IndexesCircularLinkedList(this.totalItems);
  }

  isIndexVisible(index: number) {
    return (
      index === this.visibleIndexes.current ||
      (!this.isMobile && index === this.visibleIndexes.successor) ||
      (!this.isMobile && index === this.visibleIndexes.predecessor)
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
}
