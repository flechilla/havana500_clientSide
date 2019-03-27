import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AntTranslateService } from '@hav500workspace/shared';
import { english, spanish, french } from './i18n';
import { Subject, interval } from 'rxjs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'hav-age-modal',
  templateUrl: './age-modal.component.html',
  styleUrls: ['./age-modal.component.scss']
})
export class AgeModalComponent implements OnInit {
  public userAgeFormControl = new FormControl();
  private userYearOfBirth: number;
  private buttonTextKey: string;
  public buttonText: string;
  public userAgePlaceholderText: string;
  private validAge = 18;
  public isValidAge: boolean;
  public onClose: Subject<string>;

  constructor(
    private translateService: AntTranslateService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'hav-500',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/500-hav.svg')
    );
  }

  ngOnInit() {
    this.userAgeFormControl.valueChanges.subscribe(v => {
      this.userYearOfBirth = v;
      this.validateAge();
    });

    this.buttonTextKey = 'buttonTextAdult';

    this.translateService.loadTranslations(english, spanish, french);
    this.translateText();
    this.translateService.translate.onLangChange.subscribe(x => {
      this.translateText();
    });
    this.onClose = new Subject();
  }

  accept() {
    this.onClose.next(this.userYearOfBirth.toString());
  }

  validateAge() {
    if (this.userYearOfBirth < 1925) {
      return;
    }
    const currentYear = new Date().getFullYear();
    this.isValidAge = currentYear - this.userYearOfBirth > this.validAge;

    if (!this.isValidAge) {
      this.buttonTextKey = 'buttonTextNotAdult';
    } else {
      this.buttonTextKey = 'buttonTextAdult';
    }
    this.translateText();
  }

  translateText(): void {
    this.translateService.translate.get(this.buttonTextKey).subscribe(v => {
      this.buttonText = v;
    });
    this.translateService.translate
      .get('userAgePlaceholderText')
      .subscribe(v => {
        this.userAgePlaceholderText = v;
      });
  }
}
