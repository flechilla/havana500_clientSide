import { Article } from './../../models/article.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseCrudService } from '../../../shared/services/base-crud.service';
import { environment } from '../../../../environments/environment.prod';

@Injectable()
export class ArticleService extends BaseCrudService<Article> {
  constructor(private httpClient: HttpClient) {
    super(environment.apiUrl + 'article', httpClient);
  }
}
