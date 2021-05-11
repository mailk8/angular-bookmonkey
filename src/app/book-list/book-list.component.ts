import { Component, OnInit } from '@angular/core';
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

  constructor(private bookService: BookStoreService) { }

  ngOnInit(): void {
    this.books = this.bookService.getAll();
  }
}
