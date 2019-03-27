import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
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
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
// import { OAuthModule } from 'angular-oauth2-oidc';
import { LayoutModule } from './features/layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CookieService } from 'ngx-cookie-service';
import { AgeModalComponent } from './features/age-modal/age-modal.component';
import { GalleryModule } from './features/gallery/gallery.module';


@NgModule({
  declarations: [AppComponent, AgeModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 0],
      enableTracing: false
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25 //  Retains last 25 states
    // }),
    StoreRouterConnectingModule,
    TranslateModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    GalleryModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot()

    // OAuthModule.forRoot({
    //   resourceServer: {
    //     allowedUrls: ['http://localhost:5000/api/'],
    //     sendAccessToken: true
    //   }
    // })
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AgeModalComponent]
})
export class AppModule {}
