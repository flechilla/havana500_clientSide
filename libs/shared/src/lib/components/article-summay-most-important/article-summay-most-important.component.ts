import { Component, OnInit, Input } from '@angular/core';
import { HavanaEnvironment, ArticleExtended } from '../../models';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'ant-article-summay-most-important',
  templateUrl: './article-summay-most-important.component.html',
  styleUrls: ['./article-summay-most-important.component.css']
})
export class ArticleSummayMostImportantComponent implements OnInit {

  private env: HavanaEnvironment;
  private mainPictureRelPath: string;

  @Input()
  public article: ArticleExtended;

  @Input()
  public isMetadataVisible = true;

  @Input()
  public isTitleVisible = true;

  @Input()
  public isTextVisible = true;

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

  constructor(private router: Router) {
    this.env = environment;
  }

  ngOnInit() {
    // this.mainPictureRelPath = this.env.domainUrl + this.article.mainPicture.relativePath;
  }

  navigateTo(articleId: number) {
    this.router.navigate(['/article', articleId]);
  }

}
