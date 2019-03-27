import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../base';
import { Picture, HavanaEnvironment, PictureExtended } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import { ImagesService } from './image.service';
import { retryBackoff } from 'backoff-rxjs';

@Injectable({ providedIn: 'root' })
export class GalleryService extends ImagesService {
  constructor(
    protected environment: HavanaEnvironment,
    protected httpClient: HttpClient,
    protected snack: MatSnackBar
  ) {
    super(environment.apiUrl + 'gallery', environment, httpClient, snack);
  }
  /**
   *  Gets the gallery images from the server
   * @param  {number} imagesCount The amount of images to get
   * @returns Observable<Picture> A list of images that belongs to the gallery
   */
  getGalleryImages(imagesCount: number): Observable<Picture[]> {
    const options = {
      params: new HttpParams().set('count', imagesCount.toString())
    };
    return this.httpClient
      .get<Picture[]>(this.url + '/GetGalleryImages', options)
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
