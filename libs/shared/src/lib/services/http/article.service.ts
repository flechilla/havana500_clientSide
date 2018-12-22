import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import { BaseCrudService } from '../base';
import { Article, HavanaEnvironment, ArticleExtended } from '../../models';

@Injectable()
export class ArticleService extends BaseCrudService<Article> {
  constructor(
    private environment: HavanaEnvironment,
    private httpClient: HttpClient,
    protected snack: MatSnackBar
  ) {
    super(environment.apiUrl + 'articles', httpClient, snack);
  }

  /**
   * getWithTags
   */
  public getWithTags(id: number): Observable<ArticleExtended> {
    return this.http
      .get<ArticleExtended>(this.url + '/GetArticleWithTags?articleId=' + id)
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
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
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
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
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  /**
   * Get the related articles of an Article
   *
   * @param {number} articleId
   * @returns {Observable<Article>}
   * @memberof ArticleService
   */
  public getRelatedArticles(articleId: number): Observable<Article[]> {
    return this.http
      .get<Article[]>(this.url + '/GetRelatedArticles?articleId=' + articleId)
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  public getArticlesBasicDataBySectionName(
    sectionName: string,
    currentPage: number,
    amountOfArticles: number
  ): Observable<Article[]> {
    return this.http
      .get<Article[]>(
        this.url +
          '/GetArticlesBasicDataBySectionName?sectionName=' +
          sectionName +
          '&currentPage=' +
          currentPage +
          '&amountOfArticles=' +
          amountOfArticles
      )
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }

  public getArticlesBasicDataBySectionNameAndTagIds(
    sectionName: string,
    tagIds: number[] = [],
    currentPage: number,
    amountOfArticles: number
  ): Observable<Article[]> {
    let tagsParams = '';
    tagIds.forEach((t, i) => tagsParams += '&tagsIds='+t);
    return this.http
      .get<Article[]>(
        this.url +
          '/GetArticlesBasicDataBySectionNameAndTagIds?sectionName=' +
          sectionName +
          tagsParams +
          '&currentPage=' +
          currentPage +
          '&amountOfArticles=' +
          amountOfArticles
      );
      // .pipe(
      //   publishLast(),
      //   refCount(),
      //   catchError(error => {
      //     return this.handleError(error);
      //   })
      // );
  }

  /**
   * Creates an empty temporary article
   *
   * @memberof ArticleService
   */
  public createTemporaryArticle(): Observable<Article> {
    return this.http
      .post<Article>(this.url + '/CreateTemporaryArticle', null)
      .pipe(
        publishLast(),
        refCount(),
        catchError(error => {
          return this.handleError(error);
        })
      );
  }
}
