import { Locale } from '../../models/system-misc/locale-lang.model';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class AntTranslateService {
  constructor(private translate: TranslateService) {}

  /**
   * Append local translations to system
   *
   * @param {...Locale[]} args
   * @memberof AntTranslateService
   */
  public loadTranslations(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach(locale => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translate.setTranslation(locale.lang, locale.data, true);
    });
  }

  /**
   * Sets the default language to use as a fallback
   */
  setDefaultLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
  }

  /**
   * Add available langs
   */
  addLanguages(langs: Array<string>): void {
    this.translate.addLangs(langs);
  }

  /**
   * Changes the lang currently used
   */
  useLanguage(lang: string): Observable<any> {
    return this.translate.use(lang);
  }
}
