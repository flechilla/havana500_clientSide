import { HavanaEnvironment } from './../../models/system-misc/environment-type';

import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private setCookiesUrl: string;
  private acceptCookiesUrl: string;
  private setAgeCookieUrl: string;
  private readonly cookiesAcceptedCookie = 'CookiesAccepted';
  private readonly aboveAge = 'IsLegalAge';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private environment: HavanaEnvironment
  ) {
    this.setAgeCookieUrl = environment.apiUrl + 'Cookies/SetAge';
    this.setCookiesUrl = environment.apiUrl + 'Cookies/SetLanguage';
    this.acceptCookiesUrl = environment.apiUrl + 'Cookies/AcceptCookies';
  }

  setLanguageOnCookies(lang: string): Observable<any> {
    return this.httpClient.post(this.setCookiesUrl, {
      lang: lang
    });
  }

  acceptCookies(): void {
    this.httpClient.get(this.acceptCookiesUrl).subscribe();
  }

  hideCookieBanner() {
    return true;
    // return !!this.cookieService.get(this.cookiesAcceptedCookie);
  }

  isLegalAge(): boolean {
    const ageCokie = this.cookieService.get(this.aboveAge);
    const output = !!ageCokie;

    return output;
  }

  setAgeOnCookie(userAge: number): Observable<any> {
    return this.httpClient.post(this.setAgeCookieUrl, {
      age: userAge
    });
  }
}
