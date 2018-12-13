import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Picture, MarketingImageService } from '@hav500workspace/shared';
import { IImage } from 'ng-simple-slideshow';
import * as moment from 'moment';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'hav-principal-slider',
  templateUrl: 'principal-slider.component.html',
  styleUrls: ['principal-slider.component.scss']
})
export class PrincipalSliderComponent implements OnInit {
  private firstLevelImages: Picture[];

  protected imageUrls: (string | IImage)[] = [];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private marketingImageService: MarketingImageService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Setting the changeDetector to detect when is on mobile
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.getFirstLevelImages();
  }

  getFirstLevelImages(): void {
    this.marketingImageService.getImagesByLevel(1, 5).subscribe(pics => {
      this.firstLevelImages = pics;
      this.firstLevelImages.map(pic => {
        const imgUrl: IImage = {
          url: pic.relativePath,
          caption: pic.seoFileName,
          href: pic.hRef
        };

        this.imageUrls.push(imgUrl);
      });
    });
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  protected getHavana500Moment() {
    return moment([2019, 11, 16]);
  }
}
