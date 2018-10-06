import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService, Section } from '@hav500workspace/shared';

@Component({
  selector: 'hav-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [SectionService]
})
export class AntToolbarComponent implements OnInit {
  languages: any;
  selectedLanguage: any;
  private sections: Section[];

  constructor(private router: Router, private sectionService: SectionService) {}

  ngOnInit(): void {
    this.languages = [
      { id: 'en', title: 'English', flag: 'us' },
      { id: 'fr', title: 'French', flag: 'fr' }
    ];

    this.selectedLanguage = this.languages[0];
    this.getSections();
  }

  setLanguage(lang) {
    // Set the selected language for toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    // this.translate.use(lang.id);
  }

  getSections() : void{
    this.sectionService.getAll()
      .subscribe(sections=>this.sections = sections);
  }
}
