import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    QuillModule,
    TranslateModule
  ],
  declarations: [
    //Components
    ConfirmDialogComponent,
    AntWidgetComponent,
    SquareFadeSpinnerComponent,
    ArticleSummaryComponent,
    ArticleMetadataComponent,

    //Directives
    AntWidgetToggleDirective,
    IfOnDomDirective,

    //Pipes
    KeysPipe
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

    //Components
    ConfirmDialogComponent,
    AntWidgetComponent,
    SquareFadeSpinnerComponent,
    ArticleSummaryComponent,
    ArticleMetadataComponent,

    //Directives
    AntWidgetToggleDirective,
    IfOnDomDirective,

    //Pipes
    KeysPipe
  ]
})
export class SharedModule {}
