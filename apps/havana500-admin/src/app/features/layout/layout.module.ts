// import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '@hav500workspace/shared';
import { AntToolbarComponent } from './main-menu/toolbar.component';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavVerticalItemComponent } from './side-nav/nav-item/nav-vertical-item.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    LayoutComponent,
    AntToolbarComponent,
    ContentComponent,
    NavVerticalItemComponent
  ],
  declarations: [
    LayoutComponent,
    AntToolbarComponent,
    ContentComponent,
    NavVerticalItemComponent,
  ],
  providers: []
})
export class LayoutModule {}
