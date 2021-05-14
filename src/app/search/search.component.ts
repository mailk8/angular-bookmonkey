// Buch Suche
import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {BookStoreService} from '../shared/book-store.service';
import {Book} from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyUp$ = new Subject<string>(); // Observable das Daten annimmt (Suchstring) und weiterverteilt
  foundBooks: Book[] = [];
  isLoading = false; // Class Binding im Html

  constructor(private bs: BookStoreService) { }

  ngOnInit(): void {
    this.keyUp$.pipe(filter(
      term => term.length >= 3), // Nur Suchbegriffe durchlassen, die länger als 3 Zeichen sind
      debounceTime(250),   // Entprellen: Erst wenn 250s keine Eingabe erfolgte, werden die Eingaben weitergeleitet
      distinctUntilChanged(),  // Ein erneut gleicher Suchbegriff wird nicht durchgelassen
      tap(() => this.isLoading = true), // Vor Http Anfrage Ladesymbol triggern, tap soll Seiteneffektfrei sein
      switchMap(term => this.bs.getAllSearch(term)), // Erstellt neue HttpRequests und bricht bei weiterer Eingabe noch laufende R. ab (Dpunkt S. 251)
      tap(() => this.isLoading = false)
      // Return ist ein neues Observable, in dessen Callback man beauftragt, den Inhalt ins Found-Array zu schreiben
    ).subscribe(books => this.foundBooks = books);
  }

}
