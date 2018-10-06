import {  Component,  OnInit} from '@angular/core';
import {  ActivatedRoute,  ParamMap} from '@angular/router';
import {  Location} from '@angular/common';
import {  ArticleService} from '../../services/http/article.service';
import {  ArticleExtended} from '../../models/article-extended';
import {  switchMap} from 'rxjs/operators';
import { Article } from '../../models';
import {Comment} from '../../models';

@Component({
  selector: 'ant-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  private article: ArticleExtended;
  private relatedArticles: Article[];
  private newComment: Comment;

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute, 
    private location: Location) {}

  ngOnInit() {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap)=>
    //     this.getArticle(+params.get('id')))
    // )
    this.newComment = new Comment(-1, '', '', '');
    this.newComment.articleId = -1;
    this.newComment.userEmail = '';
    this.newComment.userName = '';
    this.newComment.body = '';
    console.log(this.newComment);

    this.getArticle();
    this.getRelatedArticles();
  }

  getArticle(): void {
    const articleId = +this.route.snapshot.paramMap.get('id');

    this.articleService.getWithTags(articleId).
    subscribe(article => this.article = article);
  }

  onSelectTag(tagId: number) : void{
    console.log('this method is hit after the user selelects a tag. the tag Id is: '+tagId);
  }

  getRelatedArticles(){
    const articleId = +this.route.snapshot.paramMap.get('id');
    this.articleService.getRelatedArticles(articleId).
    subscribe(articles => this.relatedArticles = articles);
  }

  postNewComment(): void{
    this.newComment.articleId = this.article.id;
    console.log("Inside the postNewCOmment method.");
    console.log(JSON.stringify(this.newComment));
  }

}
