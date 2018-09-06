import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { KeysPipe } from './pipes/keys.pipe';
import { AntWidgetToggleDirective } from './components/widget/widget-toggle.directive';
import { AntWidgetComponent } from './components/widget/widget.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    //Components
    ConfirmDialogComponent,
    AntWidgetComponent,

    //Directives
    AntWidgetToggleDirective,

    //Pipes
    KeysPipe
  ],
  exports: [
    //Modules
    MaterialModule,

    //Components
    ConfirmDialogComponent,
    AntWidgetComponent,

    //Directives
    AntWidgetToggleDirective,

    //Pipes
    KeysPipe
  ]
})
export class SharedModule {}
