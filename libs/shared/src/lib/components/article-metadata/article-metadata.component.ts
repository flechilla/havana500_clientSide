import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article.model';
import { AntTranslateService } from '../../services/translate/translate-wrapper.service';
import { english } from './i18n';

@Component({
  selector: 'ant-article-metadata',
  templateUrl: 'article-metadata.component.html',
  styleUrls: ['article-metadata.component.scss']
})
export class ArticleMetadataComponent implements OnInit {
  @Input()
  article: Article;
  constructor(public translate: AntTranslateService) {
    this.translate.loadTranslations(english);
  }

  ngOnInit() {}
}
