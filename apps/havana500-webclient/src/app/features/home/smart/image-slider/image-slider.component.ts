import { Component, OnInit } from '@angular/core';
import { IImage } from 'ng-simple-slideshow';
import { MarketingImageService } from 'libs/shared/src/lib/services/http/marketing-image.service';
import { Picture } from '@hav500workspace/shared';
import { IncomingMessage } from 'http';

@Component({
  selector: 'hav-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {
  private firstLevelImages : Picture[];
  // imageUrls: (string | IImage)[] = [
  //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg', caption: 'The first slide', href: '#config' },
  //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
  //   { url: 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56789263/akrales_170919_1976_0104.0.jpg', caption: 'Apple TV', href: 'https://www.apple.com/' },
  //   'https://cdn.vox-cdn.com/uploads/chorus_image/image/56674755/mr_pb_is_the_best.0.jpg',
  //   { url: 'assets/kitties.jpg', backgroundSize: 'contain', backgroundPosition: 'center' }
  // ];
  private imageUrls: (string | IImage)[] = [];
  

  constructor(private marketingImageService : MarketingImageService) { }

  ngOnInit() {
    this.getFirstLevelImages();
  }

  getFirstLevelImages() : void {
    this.marketingImageService.getImagesByLevel(1, 5)
      .subscribe(pics=>{
        this.firstLevelImages = pics;
        this.firstLevelImages.map(pic => {
            const imgUrl : IImage = {url: pic.relativePath, caption: pic.seoFileName, href : pic.hRef};

            this.imageUrls.push(imgUrl);
        })
        console.log(JSON.stringify(this.imageUrls))
      });
  }

}
