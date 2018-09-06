import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AntDashboardComponent } from './dashboard.component';
import { ProjectsDashboardService } from '../../core/services/http/dashboard.service';
import { SharedModule } from '@hav500workspace/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, NgxChartsModule],
  declarations: [AntDashboardComponent],
  providers: []
})
export class FuseProjectDashboardModule {}
