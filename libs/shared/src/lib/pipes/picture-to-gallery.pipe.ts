import { GALLERY_IMAGE } from 'ngx-image-gallery';
import { Pipe, PipeTransform } from '@angular/core';
import { Picture } from '../models';

@Pipe({
  name: 'pictureToGallery'
})
export class PictureToGalleryPipe implements PipeTransform {
  transform(pictures: Picture[]): GALLERY_IMAGE[] {
    return pictures.map(a => {
      return { url: a.relativePath };
    });
  }
}
