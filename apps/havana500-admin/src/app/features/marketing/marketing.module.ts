import { NgModule } from '@angular/core';
import { MarketingRoutingModule } from './marketing-routing.module';
import { SharedModule } from '@hav500workspace/shared';
import { TranslateModule } from '@ngx-translate/core';
import { MarketingHomeComponent } from './smart/marketing-home.component';
import { CreateUpdateMarketingComponent } from './dummy/create-update/create-update-marketing.component';

@NgModule({
  imports: [MarketingRoutingModule, SharedModule, TranslateModule.forChild()],
  exports: [],
  declarations: [MarketingHomeComponent, CreateUpdateMarketingComponent],
  providers: [],
  entryComponents: [CreateUpdateMarketingComponent]
})
export class MarketingModule {}
