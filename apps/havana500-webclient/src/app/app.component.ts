import { Component, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
 
  title = 'havana500-admin';
  private modalRef: BsModalRef;
  private isValidAge: boolean;

  constructor(private translateService: AntTranslateService, 
    private cookieService: CookiesService,
    private modalService: BsModalService,
    private ref: ChangeDetectorRef) {
    // Add languages
    this.translateService.addLanguages(['en', 'es', 'fr']);
    // Set the default language
    this.translateService.setDefaultLanguage('es');
    // Use a language
    this.translateService.useLanguage('es').subscribe();

  }

  ngOnInit(): void {
    this.ageModalOn();
  }

  setUserAgeCookie(result:  number) {
    console.log(result)
      this.cookieService.setAgeOnCookie(result)
        .subscribe(r => {
            this.modalRef.hide();
            this.ref.markForCheck();
        });      
  }

  ageModalOn(): any {
    if (!this.cookieService.isLegalAge()) {
      this.modalService.config.backdrop = 'static';
      this.modalService.config.keyboard = false;
      this.modalRef = this.modalService.show(AgeModalComponent);
      this.modalRef.content.onClose.subscribe(result =>{
          this.setUserAgeCookie(result);
      });
      this.isValidAge = false;
    }
    else {
      this.isValidAge = true;
    }
  }
}
