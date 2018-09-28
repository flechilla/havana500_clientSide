import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HavanaEnvironment } from '../../models';
import { BaseCrudService } from '../base';

@Injectable()
export class CommentService extends BaseCrudService<Comment> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient
  ) {
    super(environment.apiUrl + 'comment', httpClient);
  }
}
