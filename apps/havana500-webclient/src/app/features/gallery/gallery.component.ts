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
  private currentImgColSpan = 1;
  private currentImgRowSpan = 1;
  private imgInternalIndex = 0;

  constructor(
    private galleryService: GalleryService,
    private translateService: AntTranslateService,
    private marketingImageService: MarketingImageService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  private galleryImages: Picture[];
  private totalAmountOfImages: number;

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
    this.galleryService
      .getWithPagAndSort(
        0,
        this.amountOfPictures,
        null,
        null,
        null,
        'PIctures',
        additionalFilter
      )
      .subscribe(r => {
        const result = r as any;
        this.galleryImages = result.entities;
        this.totalAmountOfImages = result.length;
      });
  }

  updateImgGridDimensions(): void {
    switch (this.imgInternalIndex) {
      case 0:
        this.currentImgColSpan = this.currentImgRowSpan = 2;
        break;
      case 1:
        this.currentImgColSpan = 1;
        this.currentImgRowSpan = 1;
        break;
      case 2:
        this.currentImgColSpan = 1;
        this.currentImgRowSpan = 1;
        break;
      case 3:
        this.currentImgColSpan = 1;
        this.currentImgRowSpan = 1;
        break;
      case 4:
        this.currentImgColSpan = 2;
        this.currentImgRowSpan = 1;
        break;
      case 5:
        this.currentImgColSpan = this.currentImgRowSpan = 1;
        break;
      case 6:
        this.currentImgColSpan = 2;
        this.currentImgRowSpan = 1;
        break;
      case 7:
        this.currentImgColSpan = 1;
        this.currentImgRowSpan = 1;
        break;
      case 8:
        this.currentImgColSpan = 1;
        this.currentImgRowSpan = 1;
        break;
      case 9:
        this.currentImgColSpan = 1;
        this.currentImgRowSpan = 1;
        break;
      case 10:
        this.currentImgColSpan = 2;
        this.currentImgRowSpan = 1;
        break;
      case 11:
        this.currentImgColSpan = this.currentImgRowSpan = 2;
        break;
      case 12:
        this.currentImgColSpan = 1;
        this.currentImgRowSpan = 1;
        break;
      case 13:
        this.currentImgColSpan = 2;
        this.currentImgRowSpan = 1;
        break;
      case 14:
        this.currentImgColSpan = 1;
        this.currentImgRowSpan = 1;
        this.imgInternalIndex = 0;
        return;

      default:
        break;
    }
    this.imgInternalIndex++;
  }
}
