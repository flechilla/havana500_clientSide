import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleComponent } from './sample.component';
import { SampleRoutingModule } from './sample-routing.module';

@NgModule({
  imports: [SampleRoutingModule],
  exports: [],
  declarations: [SampleComponent]
})
export class SampleModule {}
