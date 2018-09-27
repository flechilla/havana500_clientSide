import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AntTranslateService } from '../../core/services/translate/translate-wrapper.service';
import { spanish, french, english } from '../home/i18n';

@Component({
  selector: 'hav-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {
  constructor(private translate: AntTranslateService) {
    this.translate.loadTranslations(spanish, french, english);
  }

  ngOnDestroy(): void {}

  ngOnInit() {}
}
