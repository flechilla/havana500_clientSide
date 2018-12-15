import { Component, OnInit } from '@angular/core';
import { AntTranslateService } from '@hav500workspace/shared';
import { english, spanish, french } from './i18n';

@Component({
  selector: 'hav-impact-portal',
  templateUrl: 'impact-portal.component.html',
  styleUrls: ['impact-portal.component.scss']
})
export class ImpactPortalComponent implements OnInit {
  constructor(public translate: AntTranslateService) {
    this.translate.loadTranslations(english, spanish, french);
  }

  ngOnInit() {}
}
