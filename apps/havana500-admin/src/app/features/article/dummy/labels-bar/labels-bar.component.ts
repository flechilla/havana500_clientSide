import { ArticleExtended } from './../../../../core/models/article-extended';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ant-labels-bar',
  templateUrl: 'labels-bar.component.html',
  styleUrls: ['labels-bar.component.scss']
})
export class LabelsBarComponent implements OnInit {
  @Input()
  protected article: ArticleExtended;

  constructor() {}

  ngOnInit() {}
}
