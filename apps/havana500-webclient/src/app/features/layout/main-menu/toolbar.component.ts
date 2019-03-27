import {
  Component,
  OnInit,
  InjectionToken,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import {
  SectionService,
  Section,
  AntTranslateService
} from '@hav500workspace/shared';
import { Location } from '@angular/common';
import {
  MatMenuTrigger,
  MatIconRegistry,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { spanish, french, english } from './i18n';

@Component({
  selector: 'hav-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class AntToolbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  protected dialogRef: any;

  languages: any;
  selectedLanguage: any;
  private sections: Section[];

  constructor(
    private sectionService: SectionService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef,
    protected dialog: MatDialog,
    private translate: AntTranslateService
  ) {
    iconRegistry.addSvgIcon(
      'hav500',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/500hav.svg')
    );
  }

  ngOnInit(): void {
    // Setting the changeDetector to detect when is on mobile
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.languages = [
      { id: 'es', title: 'ESPAÑOL', flag: 'es' },
      { id: 'en', title: 'English', flag: 'us' },
      { id: 'fr', title: 'Francais', flag: 'fr' }
    ];
    this.selectedLanguage = this.languages[0];
    this.translate.setDefaultLanguage(this.selectedLanguage);

    this.translate.loadTranslations(spanish, french, english);
    //this.getSections(); we wont use this solution be the moment, gonna be static
  }

  setLanguage(lang) {
    // Set the selected language for toolbar
    this.selectedLanguage = lang;

    // Use the selected language for translations
    this.translate.useLanguage(lang.id);
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

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  openMobileMenu() {
    const dialogConfig: MatDialogConfig<any> = {
      hasBackdrop: true,
      position: { top: '0', left: '0' },
      maxWidth: '100vw',
      width: '100vw',
      panelClass: 'mobile-menu',
      closeOnNavigation: false
    };
    this.dialogRef = this.dialog.open(MobileMenuComponent, dialogConfig);
  }
}
