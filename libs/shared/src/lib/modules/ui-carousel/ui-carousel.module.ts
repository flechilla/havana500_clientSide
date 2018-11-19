import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UICarouselComponent } from './ui-carousel/ui-carousel.component';
import { UICarouselItemComponent } from './ui-carousel-item/ui-carousel-item.component';
import { UILazyloadDirective } from './directives/ui-lazy-load.directive';
import { DotsComponent } from './dots/dots.component';
import { ArrowComponent } from './arrow/arrow.component';
import { SwiperDirective } from './directives/swiper.directive';

@NgModule({
  imports: [CommonModule],
  exports: [UICarouselComponent, UICarouselItemComponent, UILazyloadDirective, DotsComponent],
  declarations: [
    UICarouselComponent,
    UICarouselItemComponent,
    DotsComponent,
    ArrowComponent,
    SwiperDirective,
    UILazyloadDirective
  ]
})
export class UICarouselModule {}
