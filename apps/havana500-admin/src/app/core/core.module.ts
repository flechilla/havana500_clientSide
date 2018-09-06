import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OAuthWrapperService } from './services/oauth-wrapper.service';
import { AuthenticatedGuard } from './route_guards/authenticated.guard';
import { AntUtilsService } from './services/ant-utils.service';
import { AccountSandbox } from './sandboxes/account-sandbox';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthService,
    OAuthWrapperService,
    AuthenticatedGuard,
    AntUtilsService,
    AccountSandbox
  ]
})
export class CoreModule {}
