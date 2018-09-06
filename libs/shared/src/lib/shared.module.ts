import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { KeysPipe } from './pipes/keys.pipe';
import { AntWidgetToggleDirective } from './components/widget/widget-toggle.directive';
import { AntWidgetComponent } from './components/widget/widget.component';
import { IfOnDomDirective } from './directives/fuse-if-on-dom/if-on-dom.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  declarations: [
    //Components
    ConfirmDialogComponent,
    AntWidgetComponent,

    //Directives
    AntWidgetToggleDirective,
    IfOnDomDirective,

    //Pipes
    KeysPipe
  ],
  exports: [
    //Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule,

    //Components
    ConfirmDialogComponent,
    AntWidgetComponent,

    //Directives
    AntWidgetToggleDirective,
    IfOnDomDirective,

    //Pipes
    KeysPipe
  ]
})
export class SharedModule {}
