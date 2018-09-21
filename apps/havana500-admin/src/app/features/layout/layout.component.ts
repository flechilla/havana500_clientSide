import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { OAuthWrapperService } from '../../core/services/oauth-wrapper.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'ant-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      icon: 'email',
      url: '/dashboard'
    },
    {
      id: 'comment',
      title: 'Comments',
      type: 'item',
      icon: 'email',
      url: '/comments'
    },
    {
      id: 'articles',
      title: 'Articles',
      type: 'item',
      icon: 'email',
      url: '/articles'
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public authService: OAuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {}
}
