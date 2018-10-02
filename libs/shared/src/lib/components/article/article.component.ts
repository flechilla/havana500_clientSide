import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {ArticleService} from '../../services/http/article.service';
import {ArticleExtended} from '../../models/article-extended';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ant-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  private article: ArticleExtended;
  constructor(private articleService: ArticleService,
  private route: ActivatedRoute, 
private location: Location) { 
  }

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap)=>
    //     this.getArticle(+params.get('id')))
    // )

    this.getArticle();

  }

  getArticle(): void{
  const articleId = +this.route.snapshot.paramMap.get('id');

    this.articleService.getWithTags(articleId).
    subscribe(article=>this.article = article);
  }

}
