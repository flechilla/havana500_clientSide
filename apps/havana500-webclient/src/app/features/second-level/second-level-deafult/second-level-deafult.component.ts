import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {  Location} from '@angular/common';
import { ArticleService, Article } from '@hav500workspace/shared';

@Component({
  selector: 'hav-second-level-deafult',
  templateUrl: './second-level-deafult.component.html',
  styleUrls: ['./second-level-deafult.component.css']
})
export class SecondLevelDeafultComponent implements OnInit {

  private articles: Article[];
  private amountOfArticles = 50;
  private currentPage = 0;

  constructor(   private route: ActivatedRoute, 
    private location: Location,
  private articleService: ArticleService) { }

  ngOnInit() {
    this.getContent();

  }

  getContent(): void{
    const sectionName = this.route.snapshot.paramMap.get('sectionName');
    this.articleService.getArticlesBasicDataBySectionName(sectionName, this.currentPage, this.amountOfArticles)
      .subscribe(articles=>this.articles = articles);
  }

  
}
