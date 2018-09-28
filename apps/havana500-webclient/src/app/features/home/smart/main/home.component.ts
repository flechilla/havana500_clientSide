import { Component, OnInit } from '@angular/core';
import { AntTranslateService, Article } from '@hav500workspace/shared';

import { english, spanish, french } from '../../i18n';

@Component({
  selector: 'hav-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  article: Article = {
    id: 0,
    createdBy: 'Nacho',
    sectionId: 0,
    title: 'dumb art',
    body: 'dumb body',
    allowComments: true,
    allowAnonymousComments: true,
    approvedCommentCount: 0,
    notApprovedCommentCount: 0,
    metaKeywords: '',
    metaDescription: '',
    metaTitle: '',
    views: 0,
    amountOfComments: 0,
    readingTime: 3,
    weight: 3,
    editorWeight: 3,
    modifiedAt: null,
    createdAt: null,
    modifiedBy: null
  };
  constructor(private translateService: AntTranslateService) {}

  ngOnInit() {
    this.translateService.loadTranslations(english, spanish, french);
  }
}
