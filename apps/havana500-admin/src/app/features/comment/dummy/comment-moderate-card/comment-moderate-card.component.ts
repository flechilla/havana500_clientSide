import { CommentModel } from '@hav500workspace/shared';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'admin-comment-moderate-card',
  templateUrl: 'comment-moderate-card.component.html',
  styleUrls: ['comment-moderate-card.component.scss']
})
export class CommentModerateCardComponent implements OnInit {
  @Input()
  comment: CommentModel;

  @Output()
  wasApproved: EventEmitter<any> = new EventEmitter();

  @Output()
  wasDenied: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  approveComment() {
    this.wasApproved.emit();
  }

  dennyComment() {
    this.wasDenied.emit();
  }
}
