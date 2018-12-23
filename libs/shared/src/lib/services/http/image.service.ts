import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { BaseCrudService } from '../base';
import { Picture, HavanaEnvironment, PictureExtended } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import { retryBackoff } from 'backoff-rxjs';

@Injectable()
export class ImagesService extends BaseCrudService<Picture> {
  constructor(
    public url: string,
    protected environment: HavanaEnvironment,
    protected httpClient: HttpClient,
    protected snack: MatSnackBar
  ) {
    super(url, httpClient, snack);
  }

  /**
   * getWithTags
   */
  public getWithTags(id: number): Observable<PictureExtended> {
    return this.http
      .get<PictureExtended>(this.url + '/GetPictureWithTags?pictureId=' + id)
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        }),
        retryBackoff(this.retryConfig)
      );
  }

  /**
   * Add Tag to Picture
   *
   * @param {number} pictureId
   * @param {number} tagId
   * @returns {Observable<any>}
   * @memberof PictureService
   */
  public addTag(pictureId: number, tagId: number): Observable<any> {
    return this.http
      .post<any>(this.url + '/addTagToPicture/', {
        pictureId: pictureId,
        contentTagId: tagId
      })
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        }),
        retryBackoff(this.retryConfig)
      );
  }

  /**
   * Remove Tag from Picture
   *
   * @param {number} pictureId
   * @param {number} tagId
   * @returns {Observable<any>}
   * @memberof PictureService
   */
  public removeTag(pictureId: number, tagId: number): Observable<any> {
    return this.http
      .delete<any>(
        this.url + `/removeTagToPicture?pictureId=${pictureId}&tagId=${tagId}`
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        }),
        retryBackoff(this.retryConfig)
      );
  }

  /**
   * Creates an empty temporary picture
   *
   * @returns {Observable<Picture>}
   * @memberof MarketingImageService
   */
  public createTemporaryPicture(): Observable<Picture> {
    return this.http
      .post<Picture>(this.url + '/CreateTemporaryPicture', null)
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
