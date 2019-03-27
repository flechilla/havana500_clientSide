import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OutstandingGeneralArticlesComponent } from './dummy/outstanding-general-articles/outstanding-general-articles.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './smart/main/home.component';
import { SharedModule } from '@hav500workspace/shared';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home-routing.module';
import { PrincipalSliderComponent } from './dummy/principal-slider/principal-slider.component';

import { OutstandingCuriositiesComponent } from './dummy/outstanding-curiosities/outstanding-curiosities.component';
import { EntertainmentComponent } from './dummy/entertainment-preview/entertainment-preview.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { MatTabsModule } from '@angular/material/tabs';
import { ImpactPortalComponent } from './dummy/impact-portal/impact-portal.component';
import { OutstandingGalleryMediasComponent } from './dummy/outstanding-gallery-medias/outstanding-gallery-medias.component';

@NgModule({
  imports: [
    SharedModule,
    TranslateModule.forChild(),
    HomeRoutingModule,
    SlideshowModule,
    CarouselModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    PrincipalSliderComponent,
    OutstandingGeneralArticlesComponent,
    OutstandingGalleryMediasComponent,
    OutstandingCuriositiesComponent,
    EntertainmentComponent,
    ImpactPortalComponent
  ]
})
export class HomeModule {}
