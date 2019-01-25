import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { SharedModule } from '@hav500workspace/shared';
import { NgxMasonryModule } from 'ngx-masonry';


@NgModule({
  imports: [SharedModule, NgxMasonryModule],
  exports: [],
  declarations: [GalleryComponent],
  providers: []
})
export class GalleryModule {}
