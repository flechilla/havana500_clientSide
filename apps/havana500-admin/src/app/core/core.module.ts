import { NgModule, Optional, SkipSelf } from '@angular/core';
import ProjectsDashboardService from '../../app/core/services/http/dashboard.service';

import {
  AntUtilsService,
  ArticleService,
  CommentService,
  ContentTagService,
  SectionService,
  AntTranslateService,
  HavanaEnvironment
} from '@hav500workspace/shared';
import { AuthenticatedGuard } from './route_guards/authenticated.guard';
import { AccountSandbox } from './sandboxes/account-sandbox';
import { environment } from '../../environments/environment';
import { AuthService } from './services/auth/auth.service';
import { StatsService } from './services/http/stats.service'; 
import { OAuthWrapperService } from './services/auth/oauth-wrapper.service';
import { ArticleCommentsInfoService } from './services/http/article-comments-info.service';

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
    AntUtilsService,
    ArticleService,
    CommentService,
    ContentTagService,
    SectionService,
    ArticleCommentsInfoService
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
