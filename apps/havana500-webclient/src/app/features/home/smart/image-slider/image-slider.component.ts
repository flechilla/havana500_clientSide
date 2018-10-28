import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { Picture, MarketingImageService } from '@hav500workspace/shared';

@Component({
  selector: 'hav-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {
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
