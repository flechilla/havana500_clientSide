import { Injectable } from '@angular/core';
import { BaseCrudService } from '../base';
import { Picture, HavanaEnvironment, PictureExtended } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MarketingImageService extends BaseCrudService<Picture> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient
  ) {
    super(environment.apiUrl + 'marketingPictures', httpClient);
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
    return this.httpClient.get<Picture[]>(
      this.url + '/GetImagesByLevel',
      options
    );
  }

  /**
   * getWithTags
   */
  public getWithTags(id: number): Observable<PictureExtended> {
    return this.http
      .get<PictureExtended>(this.url + '/GetPictureWithTags?pictureId=' + id)
      .pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
  }
}
