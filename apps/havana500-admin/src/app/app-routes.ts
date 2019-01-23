import { Routes } from '@angular/router';
import { ListUsersComponent } from './features/user-management/list-users/list-users.component';
import { AuthenticatedGuard } from './core/route_guards/authenticated.guard';
import { AddNewUserComponent } from './features/user-management/add-new-user/add-new-user.component';
import { UserProfileComponent } from './features/user-management/user-profile/user-profile.component';
import { UpdateUserProfileAfterCreationComponent } from './features/user-management/update-user-profile-after-creation/update-user-profile-after-creation.component';
export const appRoutes: Routes = [
  {
    path: 'userManagement',
    component: ListUsersComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'addNewUser',
    component: AddNewUserComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'emailCallback',
    component: UpdateUserProfileAfterCreationComponent
  },
  {
    path: 'account',
    loadChildren: './features/account/account.module#AccountModule'
  },
  {
    path: 'dashboard',
    loadChildren: './features/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'articles',
    loadChildren: './features/article/article.module#ArticleModule'
  },
  {
    path: 'comments',
    loadChildren: './features/comment/comment.module#CommentModule'
  },
  {
    path: 'marketing',
    loadChildren: './features/marketing/marketing.module#MarketingModule'
  },
  { path: '**', redirectTo: 'dashboard' }
];
