import { Component, OnInit } from '@angular/core';
import { AntTranslateService, Article } from '@hav500workspace/shared';

import { english, spanish, french } from '../../i18n';

import * as dateUt from 'moment';

@Component({
  selector: 'hav-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
 
  constructor(private translateService: AntTranslateService) {}

  ngOnInit() {
    this.translateService.loadTranslations(english, spanish, french);
  }
}
