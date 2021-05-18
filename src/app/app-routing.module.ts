// Sorgt für Komponentenwechsel
import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CanNavigateToAdminGuard} from './can-navigate-to-admin.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'books', loadChildren: () => import('./book/books.module').then(m => m.BooksModule)},  // LAZY LOADING; Präfix books darf nicht in Book Modul Route erneut definiert werden
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [CanNavigateToAdminGuard]}  // LAZY LOADING, Zusatz Guard
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],  // PRELOADING aller Module, nachdem der User das Main Modul erhalten hat
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
