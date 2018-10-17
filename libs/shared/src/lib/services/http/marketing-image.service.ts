import { Injectable } from '@angular/core';
import { BaseCrudService } from '../base';
import { Picture, HavanaEnvironment } from '../../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketingImageService extends BaseCrudService<Picture> {

  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient
  ) {
    super(environment.apiUrl + 'marketingPictures/', httpClient);
  }
  /**
   *  Gets the marketing images from the server
   * @param  {number} level The level of the required images
   * @param  {number} imagesCount The amount of images to get
   * @returns Observable<Picture> A list of images that belongs to the given level
   */
  getImagesByLevel(level: number, imagesCount: number) : Observable<Picture[]>{
    const options = {params : new HttpParams()
      .set('level', level.toString())
      .set('count', imagesCount.toString())};
    return this.httpClient.get<Picture[]>(this.url+'GetImagesByLevel', options);
  }
}
