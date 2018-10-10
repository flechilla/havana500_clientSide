import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {  Location} from '@angular/common';
import { ArticleService, Article } from '@hav500workspace/shared';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'hav-second-level-deafult',
  templateUrl: './second-level-deafult.component.html',
  styleUrls: ['./second-level-deafult.component.css']
})
export class SecondLevelDeafultComponent implements OnInit {

  articles$: Observable<Article[]>;
  //private articles: Article[];
  private amountOfArticles = 50;
  private currentPage = 0;
  sectionName: string;


  constructor(   private route: ActivatedRoute, 
    private location: Location,
  private articleService: ArticleService) { }

  ngOnInit() {
    //this.getContent();
    this.articles$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.sectionName = params.get('sectionName');
        return this.articleService.getArticlesBasicDataBySectionName(this.sectionName, this.currentPage, this.amountOfArticles)
      })
    );

  }

  // getContent(): void{
  //   const sectionName = this.route.snapshot.paramMap.get('sectionName');
  //   this.articleService.getArticlesBasicDataBySectionName(sectionName, this.currentPage, this.amountOfArticles)
  //     .subscribe(articles=>this.articles = articles);
  // }

  
}
