import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AntTranslateService } from './core/services/translate/translate-wrapper.service';

@Component({
  selector: 'ant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'havana500-admin';

  constructor(private translateService: AntTranslateService) {
    // Add languages
    this.translateService.addLanguages(['en', 'es', 'fr']);
    // Set the default language
    this.translateService.setDefaultLanguage('en');
    // Use a language
    this.translateService.useLanguage('en');
  }
}
