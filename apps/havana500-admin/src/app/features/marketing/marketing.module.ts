import { NgModule } from '@angular/core';
import { MarketingRoutingModule } from './marketing-routing.module';
import { SharedModule } from '@hav500workspace/shared';
import { TranslateModule } from '@ngx-translate/core';
import { MarketingHomeComponent } from './smart/marketing-home.component';

@NgModule({
  imports: [MarketingRoutingModule, SharedModule, TranslateModule.forChild()],
  exports: [],
  declarations: [MarketingHomeComponent],
  providers: []
})
export class MarketingModule {}
