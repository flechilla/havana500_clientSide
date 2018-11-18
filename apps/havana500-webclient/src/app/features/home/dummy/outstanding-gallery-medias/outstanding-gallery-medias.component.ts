import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GalleryService } from './../../../../../../../../libs/shared/src/lib/services/http/gallery.service';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture } from '@hav500workspace/shared';

@Component({
  selector: 'hav-outstanding-gallery',
  templateUrl: 'outstanding-gallery-medias.component.html',
  styleUrls: ['outstanding-gallery-medias.component.scss']
})
export class OutstandingGalleryMediasComponent implements OnInit {
  protected galleryImages$: Observable<Picture[]>;
  constructor(
    protected galleryService: GalleryService,
    protected sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.galleryImages$ = this.galleryService.getGalleryImages(9);
  }
}
