import { AccountSandbox } from './../../../core/sandboxes/account-sandbox';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@hav500workspace/shared';
import { UserService } from '../../../core/services/user.service';

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
  private userBasicData: User;

  @Output()
  public toggleSideNav: EventEmitter<any> = new EventEmitter();

  @Output()
  public closeSideNav: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, 
    public accountSandbox: AccountSandbox,
    private userService: UserService) {}

  ngOnInit(): void {
    this.languages = [
      { id: 'en', title: 'English', flag: 'us' },
      { id: 'es', title: 'Spanish', flag: 'es' },
      { id: 'fr', title: 'French', flag: 'fr' }
    ];

    this.selectedLanguage = this.languages[0];

    this.user$ = this.accountSandbox.getUserClaims();

    this.userService.getUserInfo()
      .subscribe(u =>{
        this.userBasicData = u;
      });
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
