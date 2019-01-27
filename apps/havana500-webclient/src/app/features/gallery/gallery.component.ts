import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
import { NgxMasonryOptions } from 'ngx-masonry';
import { GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';

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
  private isEndOfPage = false;
  private currentPage = 0;

  constructor(
    private galleryService: GalleryService,
    private translateService: AntTranslateService,
    private marketingImageService: MarketingImageService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  private galleryImages: Picture[] = [];
  private totalAmountOfImages: number;
  private sectionName = 'Galeria';
  private imageForPlugin: GALLERY_IMAGE[] = [];
  @ViewChild(NgxImageGalleryComponent)
  ngxImageGallery: NgxImageGalleryComponent;
  @ViewChild('gridContainer')
  private grid: ElementRef;

  public masonryOptions: NgxMasonryOptions = {
		transitionDuration: '0.2s',
		gutter: 20,
		resize: true,
		initLayout: true,
    fitWidth: true
  };

  ngOnInit() {
    // Size detection
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.amountOfPictures = 5;

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
        this.currentPage,
        this.amountOfPictures,
        null,
        null,
        null,
        'PIctures',
        additionalFilter
      )
      .subscribe(r => {
        const result = r as any;
        this.galleryImages = this.galleryImages.concat(result.entities);
        this.imageForPlugin = this.imageForPlugin.concat(this.transformImages(this.galleryImages));
        this.isEndOfPage = result.entities.length < this.amountOfPictures;
        this.totalAmountOfImages = result.length;
        this.currentPage++;
      });
  }

  transformImages(pictures: Picture[]): GALLERY_IMAGE[] {
    return pictures.map(a => {
      return { url: a.relativePath };
    });
  }

  openGallery(index: number) {
    this.ngxImageGallery.open(index);
  }

  loadMoreImages() {
    this.getImages();
  }
}
