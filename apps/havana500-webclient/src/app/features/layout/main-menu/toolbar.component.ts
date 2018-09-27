import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hav-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class AntToolbarComponent implements OnInit {
  languages: any;
  selectedLanguage: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.languages = [
      { id: 'en', title: 'English', flag: 'us' },
      { id: 'fr', title: 'French', flag: 'fr' }
    ];

    this.selectedLanguage = this.languages[0];
  }

  setLanguage(lang) {
    // Set the selected language for toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    // this.translate.use(lang.id);
  }
}
