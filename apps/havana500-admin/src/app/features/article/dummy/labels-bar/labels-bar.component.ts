import { ArticleExtended } from './../../../../core/models/article-extended';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'admin-labels-bar',
  templateUrl: 'labels-bar.component.html',
  styleUrls: ['labels-bar.component.scss']
})
export class LabelsBarComponent implements OnInit {
  @Input()
  public article: ArticleExtended;

  @Output()
  protected deleteTag: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  protected deleteLabel(id: any) {
    this.deleteTag.emit(id);
  }
}
