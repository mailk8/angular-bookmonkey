// Zentrale
import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import {TokenInterceptor} from './shared/token.interceptor';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {AdminModule} from './admin/admin.module';
import {BooksModule} from './book/books.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BooksModule,
    AdminModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'de'}],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeDe); // muss manuell importiert werden import localeDe from '@angular/common/locales/de';
  }
}
