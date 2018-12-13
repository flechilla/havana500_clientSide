import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  Picture,
  GalleryService,
  PictureToGalleryPipe
} from '@hav500workspace/shared';
import { NgxImageGalleryComponent, GALLERY_IMAGE } from 'ngx-image-gallery';
import { map } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'hav-outstanding-gallery',
  templateUrl: 'outstanding-gallery-medias.component.html',
  styleUrls: ['outstanding-gallery-medias.component.scss']
})
export class OutstandingGalleryMediasComponent implements OnInit {
  protected galleryImages$: Observable<Picture[]>;
  protected galleryImages: Picture[] = [];

  protected secondGallery: GALLERY_IMAGE[] = [];
  protected galleryId: 'hav-gallery';

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  gridItemClasses: string[] = [
    'first-image',
    'second-image',
    'third-image',
    'fourth-image',
    'fifth-image',
    'sixth-image',
    'seventh-image',
    'eighth-image',
    'ninth-image'
  ];

  @ViewChild(NgxImageGalleryComponent)
  ngxImageGallery: NgxImageGalleryComponent;

  constructor(
    protected galleryService: GalleryService,
    public media: MediaMatcher,
    public changeDetectorRef: ChangeDetectorRef
  ) {}

  openGallery(index: number) {
    this.ngxImageGallery.open(index);
  }

  ngOnInit() {
    // Setting the changeDetector to detect when is on mobile
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.galleryImages$ = this.galleryService.getGalleryImages(7).pipe(
      map(resp => {
        if (this.isMobile()) {
          return resp.slice(0, 4);
        } else {
          return resp;
        }
      })
    );

    this.galleryImages$.subscribe(resp => {
      this.galleryImages = resp;
      this.secondGallery = this.transform(resp);
    });
  }

  transform(pictures: Picture[]): GALLERY_IMAGE[] {
    return pictures.map(a => {
      return { url: a.relativePath };
    });
  }

  isMobile(): boolean {
    return this.mobileQuery.matches;
  }
}
