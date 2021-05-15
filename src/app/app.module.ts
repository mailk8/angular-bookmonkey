// Zentrale
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import {TokenInterceptor} from './shared/token.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateValueAccessorModule} from 'angular-date-value-accessor';
import { BookFormComponent } from './book-form/book-form.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { FormMessagesComponent } from './form-messages/form-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    SearchComponent,
    BookFormComponent,
    CreateBookComponent,
    EditBookComponent,
    FormMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // ersetzt durch ReactiveFormsModule
    DateValueAccessorModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
