import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HavanaEnvironment } from '@hav500workspace/shared';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [{ provide: HavanaEnvironment, useValue: environment }]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
