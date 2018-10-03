import { Component, OnInit, Input } from '@angular/core';
import { ArticleExtended } from '../../models/article-extended';

@Component({
  selector: 'ant-article-summary',
  templateUrl: 'article-summary.component.html',
  styleUrls: ['article-summary.component.scss']
})
export class ArticleSummaryComponent implements OnInit {
  @Input()
  public article: ArticleExtended;
  constructor() {}

  ngOnInit() {}
}
