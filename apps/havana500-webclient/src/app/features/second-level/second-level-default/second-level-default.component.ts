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
  articles$: Observable<Article[]>;
  private amountOfArticles = 50;
  private currentPage = 0;
  sectionName: string;

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
  }

  protected getArticles(tagIds: number[] = []): void {
    this.articles$ = this.articleService.getArticlesBasicDataBySectionNameAndTagIds(
      this.sectionName,
      tagIds,
      this.currentPage,
      this.amountOfArticles
    );
  }

  public tagSelectFilter(term: string, item: ContentTag): boolean {
    return item.name.toLowerCase().includes(term.toLowerCase());
  }

  tagSelectionChanged(selectedTags: any[]) {
    // console.log(selectedTags);
    // console.log(this.selectedItems);
    this.getArticles(this.selectedItems);
  }
}
