import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '@hav500workspace/shared';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AntToolbarComponent } from './main-menu/toolbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule, FlexLayoutModule],
  exports: [LayoutComponent],
  declarations: [
    LayoutComponent,
    ContentComponent,
    AntToolbarComponent,
    FooterComponent
  ],
  providers: []
})
export class LayoutModule {}
