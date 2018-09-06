import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AntDashboardComponent } from './dashboard.component';
import { SharedModule } from '@hav500workspace/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [AntDashboardComponent],
  providers: []
})
export class DashboardModule {}
