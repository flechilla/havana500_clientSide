import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HavanaEnvironment } from 'libs/shared/src/lib/models';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  private setCookiesUrl: string;
  private acceptCookiesUrl: string;
  private readonly cookiesAcceptedCookie = 'CookiesAccepted';
  
    constructor(
      private environment: HavanaEnvironment,  
      private httpClient: HttpClient,
      private cookieService: CookieService) 
      {
        this.setCookiesUrl = this.environment.apiUrl + "Cookies/SetLanguage"
        this.acceptCookiesUrl = this.environment.apiUrl + "Cookies/AcceptCookies"
      }

   setLanguageOnCookies(lang: string): void{
    this.httpClient.post(this.setCookiesUrl, {
      lang: lang
    }).subscribe();
  }

  acceptCookies(): void{
    this.httpClient.get(this.acceptCookiesUrl).subscribe();
  }

  hideCookieBanner() {
    return !!this.cookieService.get(this.cookiesAcceptedCookie);
  }
}

