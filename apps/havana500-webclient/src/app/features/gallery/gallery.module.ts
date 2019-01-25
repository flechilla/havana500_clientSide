import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { SharedModule } from '@hav500workspace/shared';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgMasonryGridModule } from 'ng-masonry-grid';


@NgModule({
  imports: [SharedModule, NgxMasonryModule, NgMasonryGridModule],
  exports: [],
  declarations: [GalleryComponent],
  providers: []
})
export class GalleryModule {}
