import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { SharedModule } from '@hav500workspace/shared';

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [GalleryComponent],
  providers: []
})
export class GalleryModule {}
