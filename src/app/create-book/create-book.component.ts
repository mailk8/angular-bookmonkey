// Komponente Bücher eingeben
import { Component, OnInit } from '@angular/core';
import {BookStoreService} from '../shared/book-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../shared/book';

@Component({
  selector: 'bm-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(
    private bs: BookStoreService,
    private route: ActivatedRoute, // will man relativ routen, muss die aktive Route reingeladen werden
    private router: Router // alleine mit dem Router wären nur absolute Pfade beim Routing möglich
  ) { }

  ngOnInit(): void {
  }

  createBook(book: Book): void {
    book.authors = book.authors.filter(Boolean); // Eingabefelder werden gefiltert, sind leere angelegt, werden die vor dem Speichern entfernt

    this.bs.create(book).subscribe(() => {
      this.router.navigate(['../..', 'books'], {relativeTo: this.route}); // User weiterleiten
    });
  }

}
