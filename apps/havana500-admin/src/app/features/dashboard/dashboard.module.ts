import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { AntDashboardComponent } from './smart/dashboard.component';
import { SharedModule } from '@hav500workspace/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, TranslateModule.forChild()],
  declarations: [AntDashboardComponent],
  providers: []
})
export class DashboardModule {}
