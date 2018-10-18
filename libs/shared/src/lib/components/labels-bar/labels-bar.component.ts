import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArticleExtended, ContentTag } from '@hav500workspace/shared';

@Component({
  selector: 'admin-labels-bar',
  templateUrl: 'labels-bar.component.html',
  styleUrls: ['labels-bar.component.scss']
})
export class LabelsBarComponent implements OnInit {
  @Input()
  public tags: ContentTag[];

  @Output()
  protected deleteTag: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  protected deleteLabel(id: any) {
    this.deleteTag.emit(id);
  }
}
