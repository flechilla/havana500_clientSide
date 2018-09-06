import { ContentTag } from './../../models/content-tag.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseCrudService } from '../../../shared/services/base-crud.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ContentTagService extends BaseCrudService<ContentTag> {
  constructor(private httpClient: HttpClient) {
    super(environment.apiUrl + 'contentTag', httpClient);
  }
}
