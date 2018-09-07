import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SampleComponent } from './smart/sample.component';
import { SampleRoutingModule } from './sample-routing.module';
import { SharedModule } from '@hav500workspace/shared';

@NgModule({
  imports: [SampleRoutingModule, SharedModule],
  exports: [],
  declarations: [SampleComponent]
})
export class SampleModule {}
