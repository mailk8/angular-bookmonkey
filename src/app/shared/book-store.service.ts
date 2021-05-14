// Erzeugt Bücher und fungiert als DAO
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Book} from './book';
import {BookRaw} from './book-raw';
import {catchError, map, retry} from 'rxjs/operators';
import {BookFactory} from './book-factory';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  // Stellt Bücher als json über eine REST-Api bereit
  private api = 'https://api4.angular-buch.com/secure';
  // books: Book[];

  constructor(private http: HttpClient) {
  }
  // Retourniert nur zum Schein ein Observable, damit die .pipe weiterhin einen validen Return hat
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error(`Fehler aufgetreten! ${error}`);
    return throwError(error);
  }

  // SEARCH
  getAllSearch(searchTerm: string): Observable<Book[]> {
    const bookArr = this.http.get<BookRaw[]>(`${this.api}/books/search/${searchTerm}`)
      .pipe(
        retry(3),
        map(rawBooksArr => rawBooksArr.map(b => BookFactory.fromRaw(b)),
          catchError(this.errorHandler)));
    return bookArr;
  }

  //////////////////////// CRUD Methoden ///////////////////////////

  // READ
  getAll(): Observable<Book[]> { // Request wird nur ausgeführt, wenn das Observable subscribed wird. Das erfolgt in den Komponenten
    //    return this.http.get<any[]>(`${this.api}/books`);
    const bookArr = this.http.get<BookRaw[]>(`${this.api}/books`)
    // erstes map transformiert das Observable, zweites map durchläuft das Array
    .pipe(
      retry(3), // Ein Operator, der autoamtisch erneute subscribed, also den HttpClient erneut triggert
      map(rawBooksArr => rawBooksArr.map(b => BookFactory.fromRaw(b)),
        catchError(this.errorHandler))); // Errorhandling muss am Schluss stehen
    return bookArr;
  }


  getSingle(isbn: string): Observable<Book> {
    // Die API bietet die Ressource /book/<isbn>
    const transfomedBook = this.http.get<BookRaw>(`${this.api}/book/${isbn}`) // HttpClient liefert ein RawBook
      .pipe(
        retry(3), // Ein Operator, der autoamtisch erneute subscribed, also den HttpClient erneut triggert
        map(e => BookFactory.fromRaw(e)), // RawBook wird umgewandelt mithilfe der Factory Methode fromRaw in Book
        catchError(this.errorHandler)); // Errorhandling muss am Schluss stehen
    return transfomedBook;
  }

  // DELETE
  remove(isbn: string): Observable<any> {
    // Service liefert bei Delete einen leeren Responsebody, es soll nicht versucht werden, diesen als json zu parsen
    return this.http.delete(`${this.api}/book/${isbn}`, {responseType: 'text'});
  }
}
