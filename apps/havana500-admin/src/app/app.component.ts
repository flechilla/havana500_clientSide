import { Component } from '@angular/core';
import { AccountSandbox } from './core/sandboxes/account-sandbox';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'hav500workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'havana500-admin';

  constructor(private accountSandbox: AccountSandbox) {
    // Set to the store the logged user
    // this.accountSandbox.getUserClaims().subscribe(claims => {
    //   if (
    //     isNullOrUndefined(claims) &&
    //     !isNullOrUndefined(this.accountSandbox.getUserClaimsFromLocalStorage())
    //   ) {
    //     this.accountSandbox.setUserClaimsState();
    //   }
    // });
  }
}
