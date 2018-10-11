import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from '@hav500workspace/shared';

@Component({
  selector: 'hav-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() 
    comment : CommentModel

  constructor() { }

  ngOnInit() {
  }

}
