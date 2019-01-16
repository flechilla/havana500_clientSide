import { Component } from '@angular/core';
import { AntTranslateService } from '@hav500workspace/shared';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CookiesService } from './core/services/cookies.service';
import { AgeModalComponent } from './features/age-modal/age-modal.component';

@Component({
  selector: 'hav-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'havana500-admin';
  private modalRef: BsModalRef;

  constructor(private translateService: AntTranslateService, 
    private cookieService: CookiesService,
    private modalService: BsModalService) {
    // Add languages
    this.translateService.addLanguages(['en', 'es', 'fr']);
    // Set the default language
    this.translateService.setDefaultLanguage('es');
    // Use a language
    this.translateService.useLanguage('es').subscribe();

    if (!this.cookieService.isLegalAge()) {
      this.modalRef = this.modalService.show(AgeModalComponent);
      this.modalRef.content.onClose.subscribe(result =>{

      })
    }
    
  }

  setUserAgeCookie(result:  number) {
      this.cookieService.setAgeOnCookie(result)
        .subscribe(r => {
            this.modalRef.hide();
        });
      
  }
}
