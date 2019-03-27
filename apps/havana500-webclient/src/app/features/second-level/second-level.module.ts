import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@hav500workspace/shared';
import { NgSelectModule } from '@ng-select/ng-select';
import { SecondLevelDefaultComponent } from './second-level-default/second-level-default.component';
import { SecondLevelRoutingModule } from './second-level-routing.module';
import { HomeModule } from '../home/home.module';
import { TranslateModule } from '@ngx-translate/core';
import { SlideshowModule } from 'ng-simple-slideshow';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    SecondLevelRoutingModule,
    HomeModule,
    TranslateModule,
    SlideshowModule
  ],
  declarations: [SecondLevelDefaultComponent]
})
export class SecondLevelModule {}
