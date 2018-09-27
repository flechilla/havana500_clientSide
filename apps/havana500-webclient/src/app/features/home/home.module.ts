import { OutstandingGaleryMediasComponent } from './dummy/outstanding-galery-medias/outstanding-galery-medias.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './smart/main/home.component';
import { SharedModule } from '@hav500workspace/shared';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home-routing.module';
import { PrincipalSliderComponent } from './dummy/principal-slider/principal-slider.component';
import { OutstandingNewsComponent } from './dummy/outstanding-news/outstanding-news.component';
import { OutstandingExperiencesComponent } from './dummy/outstanding-experiences/outstanding-experiences.component';
import { OutstandingCuriositiesComponent } from './dummy/outstanding-curiosities/outstanding-curiosities.component';
import { EntertainmentComponent } from './dummy/entertainment-preview/entertainment-preview.component';

@NgModule({
  imports: [SharedModule, TranslateModule.forChild(), HomeRoutingModule],
  exports: [],
  declarations: [
    HomeComponent,
    PrincipalSliderComponent,
    OutstandingNewsComponent,
    OutstandingGaleryMediasComponent,
    OutstandingExperiencesComponent,
    OutstandingCuriositiesComponent,
    EntertainmentComponent
  ],
  providers: []
})
export class HomeModule {}
