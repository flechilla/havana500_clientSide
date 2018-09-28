import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article.model';

@Component({
  selector: 'ant-article-metadata',
  templateUrl: 'article-metadata.component.html'
})
export class ArticleMetadataComponent implements OnInit {
  @Input()
  article: Article;
  constructor() {}

  ngOnInit() {}
}
