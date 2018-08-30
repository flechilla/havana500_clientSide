import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { KeysPipe } from './pipes/keys.pipe';
@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ConfirmDialogComponent, KeysPipe],
  exports: [MaterialModule, ConfirmDialogComponent, KeysPipe]
})
export class SharedModule {}
