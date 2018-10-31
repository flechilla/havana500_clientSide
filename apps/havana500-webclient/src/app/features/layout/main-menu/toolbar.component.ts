import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  InjectionToken,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { SectionService, Section } from '@hav500workspace/shared';
import { Location } from '@angular/common';
import { MatMenuTrigger } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hav-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [SectionService]
})
export class AntToolbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  private menuTrigger: MatMenuTrigger;

  constructor(
    private router: Router,
    private sectionService: SectionService,
    private location: Location,
    private translate: TranslateService
  ) {}
  languages: any;
  selectedLanguage: any;
  private sections: Section[];
  private DOCUMENT: InjectionToken<Document>;

  ngOnInit(): void {
    this.languages = [
      { id: 'en', title: 'English', flag: 'us' },
      { id: 'fr', title: 'French', flag: 'fr' }
    ];

    this.selectedLanguage = this.languages[0];
    //this.getSections(); we wont use this solution be the moment, gonna be static
  }

  setLanguage(lang) {
    // Set the selected language for toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this.translate.use(lang.id);
  }
  /**
   *  Gets the sections from the server. These values are used
   *  in the navabar. This is a nice thing, because we can change
   *  the name of the values in the server, and would get them here
   *  dinamically.
   */
  getSections(): void {
    this.sectionService.getAll().subscribe(sections => {
      this.sections = sections;
    });
  }
  /**
   *  This is a work around, of course that this can't be the final
   *  implementation because this reload the page...
   *
   *  What happens is that right now there is a bug when use the routeLink
   *  attr in the nav's elements
   * @param  {string} sectionName
   */
  goToSection(sectionName: string): void {
    location.assign('/section/' + sectionName);
  }

  onSelect(event: any): void {
    const menu = document.getElementById('entertainment');
    console.log(JSON.stringify(menu));
    menu.style.display = '';
    menu.style.top = '65px';
  }
}
