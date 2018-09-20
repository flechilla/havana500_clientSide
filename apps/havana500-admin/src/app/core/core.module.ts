import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { OAuthWrapperService } from './services/oauth-wrapper.service';
import { AuthenticatedGuard } from './route_guards/authenticated.guard';
import { AntUtilsService } from './services/ant-utils.service';
import { AccountSandbox } from './sandboxes/account-sandbox';
import { ProjectsDashboardService } from './services/http/dashboard.service'; 
import { StatsService } from './services/http/stats.service'; 
import { ArticleService } from './services/http/article.service';
import { CommentService } from './services/http/comment.service';
import { ContentTagService } from './services/http/content-tag.service';
import { SectionService } from './services/http/section.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
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
    SectionService
  ]
})
export class CoreModule {}
