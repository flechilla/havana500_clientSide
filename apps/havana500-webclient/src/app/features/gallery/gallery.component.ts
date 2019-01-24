import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ImagesService } from 'libs/shared/src/lib/services/http/image.service';
import {
  AntTranslateService,
  MarketingImageService
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
    private imageService: ImagesService,
    private translateService: AntTranslateService,
    private marketingImageService: MarketingImageService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

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
    this.imageService.getWithPagAndSort(0, this.amountOfPictures, null, null);
  }
}
