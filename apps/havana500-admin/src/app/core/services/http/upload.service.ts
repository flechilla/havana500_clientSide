import { Injectable } from '@angular/core';
import { BaseCrudService } from '@hav500workspace/shared';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../havana500-webclient/src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseCrudService<any> {

  constructor(private httpClient: HttpClient) {
    super(environment.apiUrl+'upload/', httpClient)
   }

  upload(fileToUpload: any, articleId: number) {
    const input = new FormData();
    input.append("file", fileToUpload);

    return this.httpClient
        .post(this.url+'UploadArticleMainPicture?articleId='+articleId, input);
}
}
