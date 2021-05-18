// Komponente Bücher editieren
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, map, switchMap} from 'rxjs/operators';
import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';

@Component({
  selector: 'bm-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book; // wird durch ngOnInit gefüllt sobald jemand die URL admin/edit:isbn aufruft

  constructor(private activeRoute: ActivatedRoute, private router: Router, private bs: BookStoreService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.pipe(
      map( params => params.get('isbn')),
      // SwitchMap verwirft 'pending REST Operationen' des inneren Observables (s)->bs.getSingle(s) wenn von außen eine neue Anfrage kommt
      // Praktisch: Fordert der User per URL ein Buch zum Bearbeiten an und direkt danach ein anderes, wird ihm nur das zuletztgenannte
      // ausgeliefert, erst Aktion wird abgebrochen.
      // https://medium.com/@teebszet/recurse-with-rxjs-observables-and-switchmap-de5942532ea#:~:text=The%20advantage%20of%20using%20switchMap,unsubscribes%20from%20the%20first%20Observable%20).
      switchMap((isbn: string) => this.bs.getSingle(isbn))) // funktioniert auch mit flatMap
      .subscribe((book) => this.book = book);
  }

  updateBook(book: Book): void {
    book.authors = book.authors.filter(Boolean); // Eingabefelder werden gefiltert, sind leere angelegt, werden die vor dem Speichern entfernt

    this.bs.update(book).subscribe(() => {
      this.router.navigate(
        ['../../..', 'books', book.isbn],
      {relativeTo: this.activeRoute}
      );
    });
  }

}
