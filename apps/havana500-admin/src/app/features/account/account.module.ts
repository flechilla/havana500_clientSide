import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@hav500workspace/shared';
import { LoginComponent } from './smart/login/login.component';
import { RegisterComponent } from './smart/register/register.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [LoginComponent, RegisterComponent],
  providers: []
})
export class AccountModule {}
