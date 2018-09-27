import { Component, OnInit } from '@angular/core';
import { AntTranslateService } from '../../../../core/services/translate/translate-wrapper.service';
import { english, spanish, french } from '../../i18n';

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
