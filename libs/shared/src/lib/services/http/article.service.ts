import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseCrudService } from '../base';
import { Article, HavanaEnvironment, ArticleExtended } from '../../models';

@Injectable()
export class ArticleService extends BaseCrudService<Article> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient
  ) {
    super(environment.apiUrl + 'articles', httpClient);
  }

  /**
   * getWithTags
   */
  public getWithTags(id: number): Observable<ArticleExtended> {
    return this.http
      .get<ArticleExtended>(this.url + '/GetArticleWithTags?articleId=' + id)
      .pipe(catchError(this.handleError));
  }

  /**
   * Add Tag to Article
   *
   * @param {number} articleId
   * @param {number} tagId
   * @returns {Observable<any>}
   * @memberof ArticleService
   */
  public addTag(articleId: number, tagId: number): Observable<any> {
    return this.http
      .post<any>(this.url + '/addTagToArticle/', {
        articleId: articleId,
        contentTagId: tagId
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Remove Tag from Article
   *
   * @param {number} articleId
   * @param {number} tagId
   * @returns {Observable<any>}
   * @memberof ArticleService
   */
  public removeTag(articleId: number, tagId: number): Observable<any> {
    return this.http
      .delete<any>(
        this.url + `/removeTagToArticle?articleId=${articleId}&tagId=${tagId}`
      )
      .pipe(catchError(this.handleError));
  }
}