import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  ArticleService,
  Article,
  ContentTag,
  ContentTagService
} from '@hav500workspace/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'hav-second-level-default',
  templateUrl: './second-level-default.component.html',
  styleUrls: ['./second-level-default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecondLevelDefaultComponent implements OnInit {
  globalTags$: Observable<ContentTag[]>;
  articles: Article[];
  articlesToRender: Article[];
  private amountOfArticles = 50;
  private currentPage = 0;
  sectionName: string;
  mostImportantArticle: Article;
  secondMostImporatantArticles: Article[];
  private isEndOfPage: boolean;

  selectedItems: any[];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private contentTagService: ContentTagService
  ) {}

  ngOnInit() {
    this.globalTags$ = this.contentTagService.getAll();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.sectionName = params.get('sectionName');
      this.getArticles();
    });
    this.isEndOfPage = false;
  }

  protected getArticles(tagIds: number[] = []): void {
    this.secondMostImporatantArticles = [];
    this.articleService.getArticlesBasicDataBySectionNameAndTagIds(
      this.sectionName,
      tagIds,
      this.currentPage,
      this.amountOfArticles
    ).subscribe(articles=>{
        this.mostImportantArticle = articles.shift();
        this.secondMostImporatantArticles.push(articles.shift());
        this.secondMostImporatantArticles.push(articles.shift());
        this.articles = articles;
        this.articlesToRender = this.articles.splice(0, 8);
    });
  }

  public tagSelectFilter(term: string, item: ContentTag): boolean {
    return item.name.toLowerCase().includes(term.toLowerCase());
  }
  /**
   *  Includes more articles in the list to render them.
   * @returns void
   */
  private includeMoreArticles(): void{
    const itemsToInclude = this.articles.splice(0, 8);
    console.log(itemsToInclude);
    this.articlesToRender = this.articlesToRender.concat(itemsToInclude);
    this.isEndOfPage = itemsToInclude.length === 0;
  }

  tagSelectionChanged(selectedTags: any[]) {
    // console.log(selectedTags);
    // console.log(this.selectedItems);
    this.getArticles(this.selectedItems);
  }
}
