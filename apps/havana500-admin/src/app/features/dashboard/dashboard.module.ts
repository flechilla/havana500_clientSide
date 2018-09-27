import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AntDashboardComponent } from './smart/dashboard.component';
import { SharedModule } from '@hav500workspace/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, TranslateModule.forChild()],
  declarations: [AntDashboardComponent],
  providers: []
})
export class DashboardModule {}
