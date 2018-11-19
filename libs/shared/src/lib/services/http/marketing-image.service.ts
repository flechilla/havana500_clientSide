import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../base';
import { Picture, HavanaEnvironment, PictureExtended } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import { ImagesService } from './image.service';

@Injectable()
export class MarketingImageService extends ImagesService {
  constructor(
    protected environment: HavanaEnvironment,
    protected httpClient: HttpClient,
    protected snack: MatSnackBar
  ) {
    super(
      environment.apiUrl + 'marketingPictures',
      environment,
      httpClient,
      snack
    );
  }
  /**
   *  Gets the marketing images from the server
   * @param  {number} level The level of the required images
   * @param  {number} imagesCount The amount of images to get
   * @returns Observable<Picture> A list of images that belongs to the given level
   */
  getImagesByLevel(level: number, imagesCount: number): Observable<Picture[]> {
    const options = {
      params: new HttpParams()
        .set('level', level.toString())
        .set('count', imagesCount.toString())
    };
    return this.httpClient
      .get<Picture[]>(this.url + '/GetImagesByLevel', options)
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  public uploadMarketingImage(
    marketingId: number,
    fileToUpload: any
  ): Observable<Picture> {
    const input = new FormData();
    input.append('file', fileToUpload);

    return this.http
      .post<Picture>(
        this.url + '/UploadMarketingPicture?marketingId=' + marketingId,
        input
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }
}
