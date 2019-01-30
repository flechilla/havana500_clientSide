import { NgModule } from '@angular/core';

import { GalleryComponent } from './gallery.component';
import { SharedModule } from '@hav500workspace/shared';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [SharedModule, NgxMasonryModule, NgMasonryGridModule, TranslateModule],
  exports: [],
  declarations: [GalleryComponent],
  providers: []
})
export class GalleryModule {}
