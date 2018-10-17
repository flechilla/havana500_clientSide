import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@hav500workspace/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSelectModule } from '@ng-select/ng-select';
import { SecondLevelDefaultComponent } from './second-level-default/second-level-default.component';

@NgModule({
  imports: [CommonModule, SharedModule, FlexLayoutModule, NgSelectModule],
  declarations: [SecondLevelDefaultComponent]
})
export class SecondLevelModule {}
