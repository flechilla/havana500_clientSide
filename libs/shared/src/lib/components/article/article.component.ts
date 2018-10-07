import {  Component,  OnInit} from '@angular/core';
import {  ActivatedRoute,  ParamMap, Router} from '@angular/router';
import {  Location} from '@angular/common';
import {  ArticleService} from '../../services/http/article.service';
import {  ArticleExtended} from '../../models/article-extended';
import {  switchMap} from 'rxjs/operators';
import { Article } from '../../models';
import {Comment} from '../../models';
import { CommentService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'ant-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  relatedArticles$: Observable<ArticleExtended[]>;
  article$: Observable<ArticleExtended>;

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute, 
    private location: Location,
  private commentService: CommentService,
private router: Router) {}

  ngOnInit() {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>{
        return this.articleService.getWithTags(+params.get('id');
      }
      ))
    );
    this.relatedArticles$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>{
        return this.articleService.getRelatedArticles(+params.get('id');
      }
      ))
    );
   

    //this.getArticle();
    //this.getRelatedArticles();
  }
  /**
   *  Get the article with the given articleId that is in the route.
   * 
   *  This implementation can be improved by using switchMap. This should be used
   *  when the component is gonna be re-used, like in this case where the user can 
   *  change to other article.
   */
  getArticle(): void {
    const articleId = +this.route.snapshot.paramMap.get('id');

    this.articleService.getWithTags(articleId).
    subscribe(article => this.article = article);
  }

  onSelectTag(tagId: number) : void{
    console.log('this method is hit after the user selelects a tag. the tag Id is: '+tagId);
  }

  /**
   *  Get the related articles of the current article. 
   * 
   * Can be improved with the swithMap
   */
  getRelatedArticles() : void{
    const articleId = +this.route.snapshot.paramMap.get('id');
    this.articleService.getRelatedArticles(articleId).
    subscribe(articles => this.relatedArticles = articles);
  }

 



}
