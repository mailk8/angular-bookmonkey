// Sorgt für Komponentenwechsel
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BookDetailsComponent} from './book/book-details/book-details.component';
import {BookListComponent} from './book/book-list/book-list.component';
import {CreateBookComponent} from './admin/create-book/create-book.component';
import {EditBookComponent} from './admin/edit-book/edit-book.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
