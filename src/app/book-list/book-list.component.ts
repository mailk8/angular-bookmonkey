import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  // Dpunkt S. 131
  books: Book[];
  @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private bookService: BookStoreService) { }

  ngOnInit(): void {
    this.books = this.bookService.getAll();
  }

  showDetails(book: Book): void {
    this.showDetailsEvent.emit(book);
  }
}
