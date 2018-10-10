import { Component, OnInit, Input } from '@angular/core';
import { ArticleExtended } from '../../models/article-extended';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import { HavanaEnvironment } from '../../models';

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
  constructor(private router: Router) {
    this.env = environment;
  }

  ngOnInit() {
    this.mainPictureRelPath = this.env.domainUrl + this.article.mainPicture.relativePath;
  }

  navigateTo(articleId: number){
    console.log(articleId);
    this.router.navigate(['/article', articleId]);
  }
}
