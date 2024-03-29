import { Locale } from '../../models/system-misc/locale-lang.model';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookiesService } from './cookies.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AntTranslateService {
  constructor(
    public translate: TranslateService,
    private cookieService: CookiesService
  ) {}

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
    this.translate.use(lang).subscribe();
    return this.cookieService.setLanguageOnCookies(lang);
  }
}
