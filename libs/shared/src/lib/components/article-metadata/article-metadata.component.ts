import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article.model';
import { AntTranslateService } from '../../services/translate/translate-wrapper.service';
import { english, spanish, french } from './i18n';

@Component({
  selector: 'ant-article-summary-metadata',
  templateUrl: 'article-metadata.component.html',
  styleUrls: ['article-metadata.component.scss']
})
export class ArticleMetadataComponent implements OnInit {
  @Input()
  article: Article;

  param = { value: 'me' };
  constructor(public translate: AntTranslateService) {
    this.translate.loadTranslations(english, spanish, french);
  }

  ngOnInit() {}
}
