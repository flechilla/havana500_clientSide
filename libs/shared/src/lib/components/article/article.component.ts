import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  Router
} from '@angular/router';
import {
  Location
} from '@angular/common';
import {
  ArticleService
} from '../../services/http/article.service';
import {
  ArticleExtended
} from '../../models/article-extended';
import {
  switchMap
} from 'rxjs/operators';
import {
  Article
} from '../../models';
import {
  Comment
} from '../../models';
import {
  CommentService
} from '../../services';
import {
  Observable
} from 'rxjs';

@Component({
  selector: 'ant-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  relatedArticles$: Observable < Article[] > ;
  article$: Observable < ArticleExtended > ;

  constructor(private articleService: ArticleService,
    private route: ActivatedRoute,
    private location: Location,
    private commentService: CommentService,
    private router: Router) {}

  ngOnInit() {
    this.getArticle();
    this.getRelatedArticles(); 

    //TODO: Update the comment. For this have to invoke the method inthe comment-home component.
  }
  /**
   *  Get the article with the given articleId that is in the route.
   */ 
  getArticle(): void {
    this.article$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.articleService.getWithTags(+params.get('id'));
        }
      )
    );
  }

  onSelectTag(tagId: number): void {
    console.log('this method is hit after the user selelects a tag. the tag Id is: ' + tagId);
  }

  /**
   *  Get the related articles of the current article. 
   */
  getRelatedArticles(): void {
    this.relatedArticles$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.articleService.getRelatedArticles(+params.get('id'));
        }
      )
    );
  }





}
