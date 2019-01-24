import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  AntTranslateService,
  MarketingImageService,
  GalleryService,
  Picture,
  getPictureTypeNumber
} from '@hav500workspace/shared';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'hav-gallery',
  templateUrl: 'gallery.component.html',
  styleUrls: ['gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  protected amountOfPictures: number;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private galleryService: GalleryService,
    private translateService: AntTranslateService,
    private marketingImageService: MarketingImageService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  private galleryImages: Picture[];

  ngOnInit() {
    // Size detection
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.amountOfPictures = 16;

    this.getImages(); 
  }
  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  getImages() {
    const galleryType = getPictureTypeNumber('Galería');
    const additionalFilter = 'PictureType = ' + galleryType;
    this.galleryService.getWithPagAndSort(0, this.amountOfPictures, null, null, null, 'PIctures', additionalFilter)
    .subscribe(r =>{
      this.galleryImages = r;
    });
  }
}
