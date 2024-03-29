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
  public tagsData: SafeHtml;
  public TAG_SELECTOR: string;
  private DATE_SELECTOR: string;
  public orderByDateItems: any[];
  public activeFilter = false;
  public atLeastOneArticle: boolean;

  public articlesMobile$: BehaviorSubject<Article[]> = new BehaviorSubject([]);

  selectedItems = [];
  selectedDateOrder: 'NONE';

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
    this.orderByDateItems = [
      {
        id: 'DESC',
        name: 'DESC'
      },
      {
        id: 'ASC',
        name: 'ASC'
      },
      {
        id: 'NONE',
        name: 'NONE'
      }
    ];
    this.globalTags$ = this.contentTagService.getAll();
    this.translateService.loadTranslations(english, spanish, french);

    // Size detection
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.amountOfArticles = this.isMobile() ? 30 : 11;

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.sectionName = params.get('sectionName');
      this.selectedItems = [];
      this.selectedDateOrder = 'NONE';
      this.currentPage = 0;
      this.tagsData = '';
      this.isFiltered();
      this.getArticles();
      this.getSecondLevelImages();
    });

    this.localTranslate();

    this.translateService.translate.onLangChange.subscribe(x => {
      this.translateService
        .useLanguage(this.translateService.translate.currentLang)
        .subscribe(_ => {
          this.getArticles();
          this.localTranslate();
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
        this.amountOfArticles,
        this.selectedDateOrder
      )
      .subscribe(articles => {
        this.atLeastOneArticle = articles.length > 0;
        articles.forEach(a => {
          /*a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '');*/
          a.title = a.title.replace(/<\/?[^>]+(>|$)/g, '');
        });
        this.isEndOfPage = articles.length < this.amountOfArticles;
        if (!this.activeFilter) {
          this.mostImportantArticle = articles.shift();

          this.secondMostImportantArticles = [];
          if (!this.isMobile() && articles.length > 0) {
            this.secondMostImportantArticles.push(articles.shift());
            if (articles.length > 0) {
              this.secondMostImportantArticles.push(articles.shift());
            }
          }

          // this.secondMostImportantArticles.forEach(a=>{
          //   a.body = a.body.substr(0, a.body.lastIndexOf(' ', 1000)) + '...';
          // });
        }

        this.articlesToRender = articles;
        // this.articlesToRender.forEach(a=>{
        //   a.body = a.body.substr(0, a.body.lastIndexOf(' ', 400)) + '...';
        // })
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
        this.amountOfActiclesToLoad,
        this.selectedDateOrder
      )
      .subscribe(articles => {
        articles.forEach(a => {
          /* a.body = a.body.replace(/<\/?[^>]+(>|$)/g, '').substr(0, a.body.lastIndexOf(' ', 400)) + '...';*/
          a.title = a.title.replace(/<\/?[^>]+(>|$)/g, '');
        });
        this.articlesToRender = this.articlesToRender.concat(articles);
        this.isEndOfPage = articles.length < this.amountOfActiclesToLoad;
      });
  }

  dateSelectionChanged(selectedDateFilter: string) {
    console.log(this.selectedDateOrder);
    this.isFiltered();
    this.currentPage = 0;
    this.getArticles(this.selectedItems);
  }

  tagSelectionChanged(selectedTags: any[]) {
    // console.log(selectedTags);
    // console.log(this.selectedItems);
    this.isFiltered();
    this.currentPage = 0;
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

  localTranslate(): void {
    const translatedDateItems = [];
    this.orderByDateItems.forEach((item, index) => {
      this.translateService.translate.get(item.id).subscribe(w => {
        item.name = w;
      });
      translatedDateItems.push(item);
    });
    this.orderByDateItems = translatedDateItems;

    this.translateService.translate.get('DATE_SELECTOR').subscribe(w => {
      this.DATE_SELECTOR = w;
    });

    this.translateService.translate.get('TAG_SELECTOR').subscribe(w => {
      this.TAG_SELECTOR = w;
    });
  }

  isFiltered(): void {
    this.activeFilter =
      this.selectedDateOrder !== 'NONE' || this.selectedItems.length > 0;
  }
}
