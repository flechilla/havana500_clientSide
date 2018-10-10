import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondLevelDeafultComponent } from './second-level-deafult/second-level-deafult.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@hav500workspace/shared';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [
    SecondLevelDeafultComponent]
})
export class SecondLevelModule { }
