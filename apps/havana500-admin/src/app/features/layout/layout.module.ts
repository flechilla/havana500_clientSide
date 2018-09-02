// import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { SharedModule } from '@hav500workspace/shared';
import { AntToolbarComponent } from './main-menu/toolbar.component';
import { ContentComponent } from './content/content.component';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [
    LayoutComponent,
    AntToolbarComponent,
    ContentComponent,
    SideNavComponent
  ],
  declarations: [
    LayoutComponent,
    AntToolbarComponent,
    ContentComponent,
    SideNavComponent
  ],
  providers: []
})
export class LayoutModule {}
