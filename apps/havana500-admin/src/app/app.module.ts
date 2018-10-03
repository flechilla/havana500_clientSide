import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './features/layout/layout.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@hav500workspace/shared';
import { CommonModule } from '@angular/common';
import { appRoutes } from './app-routes';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {
  reducers,
  metaReducers,
  CustomSerializer
} from './core/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './core/store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NxModule.forRoot(),
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabled',
      enableTracing: false
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    StoreRouterConnectingModule,
    TranslateModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:5000/api/'],
        sendAccessToken: true
      }
    })
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
