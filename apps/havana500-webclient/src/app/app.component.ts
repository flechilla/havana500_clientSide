import {
  Component,
  ChangeDetectorRef,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { AntTranslateService, CookiesService } from '@hav500workspace/shared';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AgeModalComponent } from './features/age-modal/age-modal.component';

@Component({
  selector: 'hav-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'havana500-admin';
  private modalRef: BsModalRef;
  private isValidAge = true;
  private displayMain;
  private isDev = false;

  constructor(
    private translateService: AntTranslateService,
    private cookieService: CookiesService,
    private modalService: BsModalService,
    private ref: ChangeDetectorRef
  ) {
    // Add languages
    this.translateService.addLanguages(['en', 'es', 'fr']);
    // Set the default language
    this.translateService.setDefaultLanguage('es');
    // Use a language
    this.translateService.useLanguage('es').subscribe();
  }

  ngAfterViewInit(): void {
    if (!this.isDev) {
      setTimeout(() => {
        this.ageModalOn();
      }, 1500);
    }
    else {
      this.isValidAge = true;
    }
  }

  setUserAgeCookie(result: number) {
    console.log(result);
    this.cookieService.setAgeOnCookie(result).subscribe(r => {
      this.modalRef.hide();
      this.isValidAge = true;
    });
  }

  ageModalOn(): any {
    if (!this.cookieService.isLegalAge()) {
      this.modalService.config.backdrop = 'static';
      this.modalService.config.keyboard = false;
      this.modalRef = this.modalService.show(AgeModalComponent);
      this.modalRef.setClass('custom-modal');
      this.modalRef.content.onClose.subscribe(result => {
        this.setUserAgeCookie(result);
      });
      this.isValidAge = false;
    } else {
      this.isValidAge = true;
    }
  }
}
