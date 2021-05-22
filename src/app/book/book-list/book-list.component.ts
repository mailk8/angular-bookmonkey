// Buchliste
import {Component, OnInit} from '@angular/core';
import {BookStoreService} from '../../shared/book-store.service';
import {select, Store} from '@ngrx/store';
import {loadBooks} from '../store/book.actions';
import {selectAllBooks, selectBooksLoading} from '../store/book.selectors';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  // books: Book[] = new Book[](); // ist beim Start noch 'undefined', Bücher treffen erst später von der REST-Apianfrage ein
  // books: Array<Book> = new Array();
  // books: Book[] = new Array();
  // books: Book[];
  // books$: Observable<Book[]>;

  books$ = this.store.pipe(select(selectAllBooks)); // Selektor wird verwendet
  loading$ = this.store.pipe(select(selectBooksLoading));

  // @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(/*private bookService: BookStoreService,*/ private store: Store) {
    // this.books$ = this.bookService.getAll();
    this.store.dispatch(loadBooks());
  }

  ngOnInit(): void {
    // this.books = this.bookService.getAll();
    // Service liefert ein Observable, das aboniert werden muss, Lambda übergibt die Funktion zum Wegspeichern
    // this.bookService.getAll().subscribe(e => this.books = e); // ersetzt durch Async Pipe, Observable wird in der EL aboniert
  }

  // showDetails(book: Book): void {
  // Hier wird ein custom Event emittiert, was aber zu aufwendig ist
  //   this.showDetailsEvent.emit(book);
  // }
}
