import { Comment } from './../../models/comment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseCrudService } from '../../../shared/services/base-crud.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CommentService extends BaseCrudService<Comment> {
  constructor(private httpClient: HttpClient) {
    super(environment.apiUrl + 'comment', httpClient);
  }
}
