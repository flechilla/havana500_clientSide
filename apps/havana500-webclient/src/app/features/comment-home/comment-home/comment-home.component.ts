import { Component, OnInit, Input } from '@angular/core';
import { CommentService, AntTranslateService } from '@hav500workspace/shared';
import { CommentModel } from '@hav500workspace/shared';
import { english, spanish, french } from '../i18n';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'hav-comment-home',
  templateUrl: './comment-home.component.html',
  styleUrls: ['./comment-home.component.scss']
})
export class CommentHomeComponent implements OnInit {
  // Represents the Article that is the container of the Comments
  @Input()
  articleId: number;
  private newComment: CommentModel;

  private comments: CommentModel[];
  private commentsToRender: CommentModel[];
  private endOfComments: boolean;
  private currentPage = 0;
  private page_size = 10;
  private userName = new FormControl();
  private userEmail = new FormControl();
  private body = new FormControl();
  private emailPlaceholderText: string;
  private userNamePlaceholderText: string;
  private bodyPlaceholderText: string;
  private validComment = false;


  constructor(private commentService: CommentService,private translateService: AntTranslateService) {
    console.log(this.articleId);
    this.endOfComments = false;
    this.translateService.loadTranslations(english, spanish, french);

    this.userName
    .valueChanges
    .subscribe(userName => this.newComment.userName = userName);

    this.userEmail
    .valueChanges
    .subscribe(email => {
      this.newComment.userEmail = email;
      this.validateNewCommentForm();
    });

    this.body
    .valueChanges
    .subscribe(body => {
      this.newComment.body = body;
     this.validateNewCommentForm();
    });

    this.newComment = new CommentModel();

    this.translateNewCommentPlaceholders();

    this.translateService.translate.onLangChange
    .subscribe(x=>{
      this.translateNewCommentPlaceholders();
    });
  }

  ngOnInit(): void {
    this.newComment = new CommentModel(-1, '', '', '');
    this.newComment.articleId = -1;
    this.newComment.userEmail = '';
    this.newComment.userName = '';
    this.newComment.body = '';
    console.log(this.newComment);

    this.commentService
      .getArticleComments(this.articleId, 0, 10)
      .subscribe(_comments => {
        this.commentsToRender = _comments;
          this.endOfComments = _comments.length < this.page_size;

      });
  }

  private loadMoreComments(): void{
    this.commentService
    .getArticleComments(this.articleId, ++this.currentPage, this.page_size)
    .subscribe(_comments => {
      this.commentsToRender = this.commentsToRender.concat(_comments);
      this.endOfComments = _comments.length < this.page_size;
    });
  }
  /**
   *  Post a new comment to the server and add it to the list of comments.
   *  This will update the DOM automatically.
   */
  postNewComment(): void {
    this.newComment.articleId = this.articleId;

    this.commentService.create(this.newComment).subscribe(newComment => {
      this.newComment = new CommentModel();
      this.userEmail.reset();
      this.userName.reset();
      this.body.reset();
    });
  }

  translateNewCommentPlaceholders() : void {
    this.translateService.translate
      .get('EMAIL')
      .subscribe(value=>{
        this.emailPlaceholderText = value;        
      });
      this.translateService.translate
      .get('NAME')
      .subscribe(value=>{
        this.userNamePlaceholderText = value;        
      });
      this.translateService.translate
      .get('MESSAGE')
      .subscribe(value=>{
        this.bodyPlaceholderText = value;        
      });
  }

  validateNewCommentForm() : void{
     this.validComment = this.body.valid && this.userEmail.valid;
  }
}
