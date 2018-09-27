import { NgModule } from '@angular/core';
import { HomeComponent } from './smart/main/home.component';
import { SharedModule } from '@hav500workspace/shared';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [SharedModule, TranslateModule.forChild()],
  exports: [],
  declarations: [HomeComponent],
  providers: []
})
export class HomeModule {}
