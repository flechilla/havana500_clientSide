import { Component } from '@angular/core';
import { AccountSandbox } from './core/sandboxes/account-sandbox';
import { isNullOrUndefined } from 'util';
import { OAuthService, EventType } from 'angular-oauth2-oidc';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hav500workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'havana500-admin';

  constructor(
    private accountSandbox: AccountSandbox,
    private oauthService: OAuthService,
    private translateService: TranslateService
  ) {
    // Set to the store the logged user
    this.accountSandbox.getUserClaims().subscribe(claims => {
      if (
        isNullOrUndefined(claims) &&
        !isNullOrUndefined(this.accountSandbox.getUserClaimsFromLocalStorage())
      ) {
        this.accountSandbox.setUserClaimsState();
      }
    });

    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_expires') {
        this.accountSandbox.refreshToken();
      }
    });

    // Add languages
    this.translateService.addLangs(['en', 'es', 'fr']);
    // Set the default language
    this.translateService.setDefaultLang('en');
    // Use a language
    this.translateService.use('en');
  }
}
