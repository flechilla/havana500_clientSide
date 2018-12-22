import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { AntTranslateService, Article } from '@hav500workspace/shared';

import { english, spanish, french } from '../../i18n';
import { CookiesService } from 'apps/havana500-webclient/src/app/core/services/cookies.service';

@Component({
  selector: 'hav-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor(
    private translateService: AntTranslateService,
    private cookiesService: CookiesService) {}

  ngOnInit() {
    this.translateService.loadTranslations(english, spanish, french);
  }

  acceptCookies(): void{
    this.cookiesService.acceptCookies();
  }
}
