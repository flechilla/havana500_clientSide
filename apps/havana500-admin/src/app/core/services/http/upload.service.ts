import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '@hav500workspace/shared';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { publishLast, refCount, catchError } from 'rxjs/operators';
import { retryBackoff } from 'backoff-rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseCrudService<any> {
  constructor(private httpClient: HttpClient, protected snack: MatSnackBar) {
    super(environment.apiUrl + 'upload/', httpClient, snack);
  }

  upload(fileToUpload: any, articleId: number) {
    const input = new FormData();
    input.append('file', fileToUpload);

    return this.httpClient
      .post(this.url + 'UploadArticleMainPicture?articleId=' + articleId, input)
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        }),
        retryBackoff(this.retryConfig)
      );
  }

  uploadUserImage(fileToUpload: any, userId: string) {
    const input = new FormData();
    input.append('file', fileToUpload);

    return this.httpClient
      .post(this.url + 'UploadUserImage?userId=' + userId, input)
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        }),
        retryBackoff(this.retryConfig)
      );
  }
}
