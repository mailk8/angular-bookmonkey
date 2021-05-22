// Zentrale
import {Inject, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import {TokenInterceptor} from './shared/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
// import {registerLocaleData} from '@angular/common';
// import localeDe from '@angular/common/locales/de';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}), // akzeptiert Recuder und Einsatzzweck
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([])
    // BooksModule, // für LAZY LOADING entfernt
    // AdminModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
    // {provide: LOCALE_ID, useValue: 'de'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(LOCALE_ID) locale: string) {
    console.log('Current Locale:', locale);
    // constructor() {
    // registerLocaleData(localeDe); // muss manuell importiert werden import localeDe from '@angular/common/locales/de';
  }
}
