import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { OAuthWrapperService } from './services/auth/oauth-wrapper.service';
import { AuthenticatedGuard } from './route_guards/authenticated.guard';
import { AntUtilsService } from './services/utils/ant-utils.service';
import { ProjectsDashboardService } from './services/http/dashboard.service';
import { ArticleService } from './services/http/article.service';
import { CommentService } from './services/http/comment.service';
import { ContentTagService } from './services/http/content-tag.service';
import { SectionService } from './services/http/section.service';
import { AntTranslateService } from './services/translate/translate-wrapper.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AntUtilsService,
    ArticleService,
    CommentService,
    ContentTagService,
    SectionService,
    AntTranslateService
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
