import { Component, OnInit, Input } from '@angular/core';
import { ArticleExtended } from '../../models/article-extended';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HavanaEnvironment } from '../../models';
import { AntTranslateService } from '../../services';
import { english, spanish, french } from './i18n';

@Component({
  selector: 'ant-article-summary',
  templateUrl: 'article-summary.component.html',
  styleUrls: ['article-summary.component.scss']
})
export class ArticleSummaryComponent implements OnInit {
  private env: HavanaEnvironment;
  private mainPictureRelPath: string;

  @Input()
  public article: ArticleExtended;

  @Input()
  public isMetadataVisible: boolean = true;

  @Input()
  public isTitleVisible: boolean = true;

  @Input()
  public isTextVisible: boolean = true;

  @Input()
  public isTopArticle = false;

  @Input()
  public isCuriosityHomeArticle = false;

  @Input()
  public isCuriositySelected = false;

  @Input()
  public isExperienceArticle = false;

  @Input()
  public isEntertainmentArticle = false;

  @Input()
  public isCardShadowMode = true;

  @Input()
  public isAuthorVisible = true;

  @Input()
  public isCreationDateVisible = true;

  constructor(private router: Router, public translate: AntTranslateService) {
    this.env = environment;
    this.translate.loadTranslations(english, spanish, french);
  }

  ngOnInit() {
    // this.mainPictureRelPath = this.env.domainUrl + this.article.mainPicture.relativePath;
  }

  navigateTo(articleId: number) {
    this.router.navigate(['/article', articleId]);
  }
}
