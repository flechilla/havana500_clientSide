import { Article } from './../../models/article.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseCrudService } from '../../../shared/services/base-crud.service';

@Injectable()
export class ArticleService extends BaseCrudService<Article> {
  constructor(private httpClient: HttpClient) {
    super(environment.apiUrl + 'articles', httpClient);
  }
}
