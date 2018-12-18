import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { KeysPipe } from './pipes/keys.pipe';
import { AntWidgetToggleDirective } from './components/widget/widget-toggle.directive';
import { AntWidgetComponent } from './components/widget/widget.component';
import { IfOnDomDirective } from './directives/ant-if-on-dom/if-on-dom.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SquareFadeSpinnerComponent } from './components/squares-fade-spinner/square-fade-spinner.component';
import { QuillModule } from 'ngx-quill';
import { ArticleSummaryComponent } from './components/article-summary/article-summary.component';
import { ArticleMetadataComponent } from './components/article-metadata/article-metadata.component';
import { TranslateModule } from '@ngx-translate/core';
import { LabelsBarComponent } from './components/labels-bar/labels-bar.component';
import { KeysEasedPipe } from './pipes/keys-eased.pipe';
import { UICarouselModule } from './modules/ui-carousel/ui-carousel.module';
import { CountdownComponent } from './components/countdown/countdown.component';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { PictureToGalleryPipe } from './pipes/picture-to-gallery.pipe';
import { ArticleSummayMostImportantComponent } from './components/article-summay-most-important/article-summay-most-important.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    QuillModule,
    TranslateModule,
    UICarouselModule,

    NgxImageGalleryModule
  ],
  declarations: [
    //Components
    ConfirmDialogComponent,
    AntWidgetComponent,
    SquareFadeSpinnerComponent,
    ArticleSummaryComponent,
    ArticleMetadataComponent,
    LabelsBarComponent,
    CountdownComponent,

    //Directives
    AntWidgetToggleDirective,
    IfOnDomDirective,

    //Pipes
    KeysPipe,
    KeysEasedPipe,
    PictureToGalleryPipe,
    ArticleSummayMostImportantComponent
  ],
  exports: [
    //Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgxChartsModule,
    QuillModule,
    UICarouselModule,

    NgxImageGalleryModule,

    //Components
    ConfirmDialogComponent,
    AntWidgetComponent,
    SquareFadeSpinnerComponent,
    ArticleSummaryComponent,
    ArticleMetadataComponent,
    LabelsBarComponent,
    CountdownComponent,

    //Directives
    AntWidgetToggleDirective,
    IfOnDomDirective,

    //Pipes
    KeysPipe,
    KeysEasedPipe,
    PictureToGalleryPipe
  ]
})
export class SharedModule {}
