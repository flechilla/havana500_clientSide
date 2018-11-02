import { Component, OnInit, Input } from '@angular/core';
import { ArticleExtended } from '../../models/article-extended';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HavanaEnvironment } from '../../models';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';

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

  constructor(private router: Router) {
    this.env = environment;
  }

  ngOnInit() {
    // this.mainPictureRelPath = this.env.domainUrl + this.article.mainPicture.relativePath;
  }

  navigateTo(articleId: number) {
    console.log(articleId);
    this.router.navigate(['/article', articleId]);
  }
}
