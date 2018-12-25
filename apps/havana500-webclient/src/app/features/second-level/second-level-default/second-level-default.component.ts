import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  ArticleService,
  Article,
  ContentTag,
  ContentTagService,
  AntTranslateService,
  MarketingImageService,
  Picture
} from '@hav500workspace/shared';
import { Observable } from 'rxjs';
import { english, spanish, french } from '../i18n';
import { IImage } from 'ng-simple-slideshow';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'hav-second-level-default',
  templateUrl: './second-level-default.component.html',
  styleUrls: ['./second-level-default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecondLevelDefaultComponent implements OnInit {
  globalTags$: Observable<ContentTag[]>;
  articlesToRender: Article[];
  private amountOfArticles = 11;
  // this represent 2 rows of article's summaries
  private amountOfActiclesToLoad = 8;
  private currentPage = 0;
  sectionName: string;
  mostImportantArticle: Article;
  secondMostImportantArticles: Article[];
  private isEndOfPage = false;
  private marketingImages: Picture[];
  protected imageUrls: (string | IImage)[] = [];

  selectedItems: any[];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private contentTagService: ContentTagService,
    private translateService: AntTranslateService,
    private marketingImageService: MarketingImageService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.globalTags$ = this.contentTagService.getAll();
    this.translateService.loadTranslations(english, spanish, french);

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.sectionName = params.get('sectionName');
      this.getArticles();
      this.getSecondLevelImages();
    });

    // Size detection
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  protected getArticles(tagIds: number[] = []): void {
    this.secondMostImportantArticles = [];
    this.articleService
      .getArticlesBasicDataBySectionNameAndTagIds(
        this.sectionName,
        tagIds,
        this.currentPage,
        this.amountOfArticles
      )
      .subscribe(articles => {
        this.isEndOfPage = articles.length < this.amountOfArticles;
        this.mostImportantArticle = articles.shift();
        this.secondMostImportantArticles.push(articles.shift());
        this.secondMostImportantArticles.push(articles.shift());
        this.articlesToRender = articles;
      });
  }

  public tagSelectFilter(term: string, item: ContentTag): boolean {
    return item.name.toLowerCase().includes(term.toLowerCase());
  }
  /**
   *  Includes more articles in the list to render them.
   * @returns void
   */
  private loadMoreArticles(): void {
    this.articleService
      .getArticlesBasicDataBySectionNameAndTagIds(
        this.sectionName,
        this.selectedItems,
        ++this.currentPage,
        this.amountOfActiclesToLoad
      )
      .subscribe(articles => {
        this.articlesToRender = this.articlesToRender.concat(articles);
        this.isEndOfPage = articles.length < this.amountOfActiclesToLoad;
      });
  }

  tagSelectionChanged(selectedTags: any[]) {
    // console.log(selectedTags);
    // console.log(this.selectedItems);
    this.getArticles(this.selectedItems);
  }

  getSecondLevelImages(): void {
    this.marketingImageService.getImagesByLevel(2, 5).subscribe(pics => {
      this.marketingImages = pics;
      this.marketingImages.map(pic => {
        const imgUrl: IImage = {
          url: pic.relativePath,
          caption: pic.seoFileName,
          href: pic.hRef
        };

        this.imageUrls.push(imgUrl);
      });
    });
    console.log(this.imageUrls);
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }
}
