import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AntTranslateService } from '@hav500workspace/shared';
import { english, spanish, french } from './i18n';


@Component({
  selector: 'hav-age-modal',
  templateUrl: './age-modal.component.html',
  styleUrls: ['./age-modal.component.scss']
})
export class AgeModalComponent implements OnInit {

  private userAgeFormControl = new FormControl();
  private userYearOfBirth: number;
  private buttonTextKey: string;
  private buttonText: string;
  private userAgePlaceholderText: string;
  private validAge = 18;

  constructor(private translateService: AntTranslateService) { }

  ngOnInit() {
    this.userAgeFormControl.valueChanges.subscribe(v => {
      this.userYearOfBirth = v;
      this.validateAge();
    });

    this.buttonTextKey = 'buttonTextAdult';

    this.translateService.loadTranslations(english, spanish, french);
    this.translateText();
    this.translateService.translate.onLangChange
    .subscribe(x=>{
      this.translateText();
    });
  }

  accept() {

  }

  validateAge() {
    const currentYear = (new Date()).getFullYear();
    const isValid = (currentYear - this.userYearOfBirth) > this.validAge;

    if (!isValid) {
      this.buttonTextKey = 'buttonTextNotAdult';
    }
    else {
      this.buttonTextKey = 'buttonTextAdult'
    }
    this.translateText();
  }

  translateText(): void {
    this.translateService.translate.get(this.buttonTextKey)
        .subscribe(v => {
          this.buttonText = v;
        });
    this.translateService.translate.get('userAgePlaceholderText')
        .subscribe(v => {
          this.userAgePlaceholderText = v;
        });
  }

}
