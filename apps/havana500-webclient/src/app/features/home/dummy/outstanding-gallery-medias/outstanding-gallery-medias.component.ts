import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  Picture,
  GalleryService,
  PictureToGalleryPipe
} from '@hav500workspace/shared';
import { GalleryItem } from '@ngx-gallery/core';
import { NgxImageGalleryComponent, GALLERY_IMAGE } from 'ngx-image-gallery';
import { map } from 'rxjs/operators';

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

  constructor(protected galleryService: GalleryService) {}

  openGallery(index: number) {
    this.ngxImageGallery.open(index);
  }

  ngOnInit() {
    this.galleryImages$ = this.galleryService.getGalleryImages(9);

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
}
