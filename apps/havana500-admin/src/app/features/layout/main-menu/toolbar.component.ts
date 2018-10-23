import { AccountSandbox } from './../../../core/sandboxes/account-sandbox';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class AntToolbarComponent implements OnInit {
  userStatusOptions: any[];

  languages: any;
  selectedLanguage: any;

  user$: Observable<any>;

  @Output()
  public toggleSideNav: EventEmitter<any> = new EventEmitter();

  @Output()
  public closeSideNav: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, public accountSandbox: AccountSandbox) {}

  ngOnInit(): void {
    this.languages = [
      { id: 'en', title: 'English', flag: 'us' },
      { id: 'es', title: 'Spanish', flag: 'es' },
      { id: 'fr', title: 'French', flag: 'fr' }
    ];

    this.selectedLanguage = this.languages[0];

    this.user$ = this.accountSandbox.getUserClaims();
  }

  public toggleSNav() {
    this.toggleSideNav.emit();
  }

  setLanguage(lang) {
    // Set the selected language for toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    // this.translate.use(lang.id);
  }

  logout() {
    this.closeSideNav.emit();
    this.accountSandbox.logout();
  }
}
