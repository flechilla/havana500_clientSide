import { Component } from '@angular/core';
import { AntTranslateService } from '@hav500workspace/shared';

@Component({
  selector: 'hav-root',
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
