import { Component, OnInit } from '@angular/core';
import { Picture, MarketingImageService } from '@hav500workspace/shared';
import { IImage } from 'ng-simple-slideshow';

@Component({
  selector: 'hav-principal-slider',
  templateUrl: 'principal-slider.component.html'
})
export class PrincipalSliderComponent implements OnInit {
  private firstLevelImages: Picture[];

  protected imageUrls: (string | IImage)[] = [];

  constructor(private marketingImageService: MarketingImageService) {}

  ngOnInit() {
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
      console.log(JSON.stringify(this.imageUrls));
    });
  }
}
