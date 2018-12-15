import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { AntTranslateService, Article } from '@hav500workspace/shared';

import { english, spanish, french } from '../../i18n';

@Component({
  selector: 'hav-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor(private translateService: AntTranslateService) {}

  ngOnInit() {
    this.translateService.loadTranslations(english, spanish, french);
  }
}
