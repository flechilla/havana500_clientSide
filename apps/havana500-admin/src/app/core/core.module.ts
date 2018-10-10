import { NgModule, Optional, SkipSelf } from '@angular/core';

import {
  HavanaEnvironment,
  AntUtilsService,
  ArticleService,
  CommentService,
  ContentTagService,
  SectionService,
  AntTranslateService
} from '@hav500workspace/shared';
import { AuthenticatedGuard } from './route_guards/authenticated.guard';
import { AccountSandbox } from './sandboxes/account-sandbox';
import { environment } from '../../environments/environment';
import { AuthService } from './services/auth/auth.service';
import { StatsService } from './services/http/stats.service';
import { OAuthWrapperService } from './services/auth/oauth-wrapper.service';
import { ArticleCommentsInfoService } from './services/http/article-comments-info.service';
import ProjectsDashboardService from './services/http/dashboard.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    AuthService,
    OAuthWrapperService,
    AuthenticatedGuard,
    AntUtilsService,
    AccountSandbox,
    ProjectsDashboardService,
    StatsService,
    ArticleService,
    CommentService,
    ContentTagService,
    SectionService,
    ArticleCommentsInfoService,
    AntTranslateService,
    { provide: HavanaEnvironment, useValue: environment }
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
