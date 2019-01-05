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
import { Observable, BehaviorSubject } from 'rxjs';
import { english, spanish, french } from '../i18n';
import { IImage } from 'ng-simple-slideshow';
import { MediaMatcher } from '@angular/cdk/layout';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'hav-second-level-default',
  templateUrl: './second-level-default.component.html',
  styleUrls: ['./second-level-default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SecondLevelDefaultComponent implements OnInit {
  globalTags$: Observable<ContentTag[]>;
  articlesToRender: Article[];
  protected amountOfArticles: number;
  // this represent 2 rows of article's summaries
  protected amountOfActiclesToLoad = 8;
  protected currentPage = 0;
  sectionName: string;
  mostImportantArticle: Article;
  secondMostImportantArticles: Article[];
  protected isEndOfPage = false;
  protected marketingImages: Picture[];
  protected imageUrls: (string | IImage)[] = [];
  protected tagsData: SafeHtml;

  protected articlesMobile$: BehaviorSubject<Article[]> = new BehaviorSubject(
    []
  );

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
    public changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.globalTags$ = this.contentTagService.getAll();
    this.translateService.loadTranslations(english, spanish, french);

    // Size detection
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.amountOfArticles = this.isMobile() ? 30 : 11;

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.sectionName = params.get('sectionName');
      this.getArticles();
      this.getSecondLevelImages();
    });

    this.translateService.translate.onLangChange.subscribe(x => {
      this.translateService
        .useLanguage(this.translateService.translate.currentLang)
        .subscribe(_ => {
          this.getArticles();
        });
    });
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
        articles.forEach(a => {
          a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '');
          a.title = a.title.replace(/<\/?[^>]+(>|$)/g, '');
        });
        this.isEndOfPage = articles.length < this.amountOfArticles;
        this.mostImportantArticle = articles.shift();

        this.secondMostImportantArticles = [];
        if (!this.isMobile() && articles.length > 0) {
          this.secondMostImportantArticles.push(articles.shift());
          if (articles.length > 0) {
            this.secondMostImportantArticles.push(articles.shift());
          }
        }

        this.articlesToRender = articles;
        this.articlesMobile$.next(this.articlesToRender);
      });
  }

  public tagSelectFilter(term: string, item: ContentTag): boolean {
    return item.name.toLowerCase().includes(term.toLowerCase());
  }
  /**
   *  Includes more articles in the list to render them.
   * @returns void
   */
  public loadMoreArticles(): void {
    this.articleService
      .getArticlesBasicDataBySectionNameAndTagIds(
        this.sectionName,
        this.selectedItems,
        ++this.currentPage,
        this.amountOfActiclesToLoad
      )
      .subscribe(articles => {
        articles.forEach(a => {
          a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '');
          a.title = a.title.replace(/<\/?[^>]+(>|$)/g, '');
        });
        this.articlesToRender = this.articlesToRender.concat(articles);
        this.isEndOfPage = articles.length < this.amountOfActiclesToLoad;
      });
  }

  tagSelectionChanged(selectedTags: any[]) {
    // console.log(selectedTags);
    // console.log(this.selectedItems);
    this.getArticles(this.selectedItems);
    // document.getElementById('tags-container').innerHTML = "";
    // const tagContainer = document.getElementById('tags-container')
    // selectedTags.forEach(tag =>{
    //   tagContainer.append('<span class="tag-item">' + tag.name + '</span>')
    // })
    let tagsContainerDataString = '<mat-chip-list id="article-tags">';
    selectedTags.forEach(tag => {
      tagsContainerDataString +=
        `<div
       class="article-tag"
       (click)="onSelectTag(tag.id)">
       <img src="assets/images/tag-icon.png" />` +
        tag.name +
        `</div>`;
    });
    tagsContainerDataString += '</mat-chip-list>';
    this.tagsData = this.sanitizer.bypassSecurityTrustHtml(
      tagsContainerDataString
    );
  }

  getSecondLevelImages(): void {
    this.marketingImageService.getImagesByLevel(1, 5).subscribe(pics => {
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
