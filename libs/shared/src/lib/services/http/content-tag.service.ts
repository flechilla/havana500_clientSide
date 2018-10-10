import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseCrudService } from '../base';
import { ContentTag, HavanaEnvironment } from '../../models';

@Injectable()
export class ContentTagService extends BaseCrudService<ContentTag> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient
  ) {
    super(environment.apiUrl + 'tag', httpClient);
  }
}
