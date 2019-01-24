import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { SharedModule } from '@hav500workspace/shared';
import { NgxMasonryModule } from 'ngx-masonry';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';


@NgModule({
  imports: [SharedModule, NgxMasonryModule, MasonryGalleryModule],
  exports: [],
  declarations: [GalleryComponent],
  providers: []
})
export class GalleryModule {}
