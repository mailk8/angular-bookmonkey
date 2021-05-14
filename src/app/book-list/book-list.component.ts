// Buchliste
import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  // books: Book[] = new Book[](); // ist beim Start noch 'undefined', Bücher treffen erst später von der REST-Apianfrage ein
  // books: Array<Book> = new Array();
  // books: Book[] = new Array();
  books: Book[];

  // @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private bookService: BookStoreService) { }

  ngOnInit(): void {
    // this.books = this.bookService.getAll();
    // Service liefert ein Observable, das aboniert werden muss, Lambda übergibt die Funktion zum Wegspeichern
    this.bookService.getAll().subscribe(e => this.books = e);
  }

  // showDetails(book: Book): void {
  // Hier wird ein custom Event emittiert, was aber zu aufwendig ist
  //   this.showDetailsEvent.emit(book);
  // }
}
