import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '@hav500workspace/shared';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AntToolbarComponent } from './main-menu/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, FlexLayoutModule],
  exports: [LayoutComponent],
  declarations: [
    LayoutComponent,
    ContentComponent,
    AntToolbarComponent,
    FooterComponent,
    MobileMenuComponent
  ],
  providers: [],
  entryComponents: [MobileMenuComponent]
})
export class LayoutModule {}
