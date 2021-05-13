// Erzeugt Bücher und fungiert als DAO
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Book} from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  // Stellt Bücher als json über eine REST-Api bereit
  private api = 'https://api4.angular-buch.com';
  // books: Book[];

  constructor(private http: HttpClient) {
  }

  //////////////////////// CRUD Methoden ///////////////////////////

  // READ
  getAll(): Observable<Book[]> { // Request wird nur ausgeführt, wenn das Observable subscribed wird. Das erfolgt in den Komponenten
    return this.http.get<any[]>(`${this.api}/books`);
  }

  getSingle(isbn: string): Observable<Book> {
    // Die API bietet die Ressource /book/<isbn>
    return this.http.get<any>(`${this.api}/book/${isbn}`);
  }

  // DELETE
  remove(isbn: string): Observable<any> {
    // Service liefert bei Delete einen leeren Responsebody, es soll nicht versucht werden, diesen als json zu parsen
    return this.http.delete(`${this.api}/book/${isbn}`, {responseType: 'text'});
  }
}
