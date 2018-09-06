import { AccountSandbox } from './../../../core/sandboxes/account-sandbox';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'ant-toolbar',
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
    this.userStatusOptions = [
      {
        title: 'Online',
        icon: 'icon-checkbox-marked-circle',
        color: '#4CAF50'
      },
      { title: 'Away', icon: 'icon-clock', color: '#FFC107' },
      { title: 'Do not Disturb', icon: 'icon-minus-circle', color: '#F44336' },
      {
        title: 'Invisible',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#BDBDBD'
      },
      {
        title: 'Offline',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#616161'
      }
    ];

    this.languages = [
      { id: 'en', title: 'English', flag: 'us' },
      { id: 'tr', title: 'Turkish', flag: 'tr' }
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
