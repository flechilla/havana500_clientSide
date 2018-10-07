import { Component, OnInit, Input } from '@angular/core';
import { ArticleExtended } from '../../models/article-extended';
import {Router} from '@angular/router';

@Component({
  selector: 'ant-article-summary',
  templateUrl: 'article-summary.component.html',
  styleUrls: ['article-summary.component.scss']
})
export class ArticleSummaryComponent implements OnInit {
  @Input()
  public article: ArticleExtended;
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateTo(articleId: number){
    console.log(articleId);
    this.router.navigate(['/article', articleId]);
  }
}
