// Detailansicht Buch
import {Component, Input, OnInit} from '@angular/core';
import { Book } from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Book;
  // @Output() showListEvent = new EventEmitter<any>();

  constructor(private bs: BookStoreService, // Beziehen des Buchs
              private route: ActivatedRoute, // Abfragen der Requestparams
              private router: Router) { // Weiterleiten des Users
  }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap; // Holen der Requestparameter
    // this.book = this.bs.getSingle(params.get('isbn')); // das funktioniert dynamisch -> this ist "View oder RequestScoped"
    this.bs.getSingle(params.get('isbn')).subscribe(e => this.book = e);
  }

  getRating(num: number): Array<number> {
    return new Array(num);
  }

  removeBook(): void {
    if (window.confirm('Buch wirklich löschen?')) { // Dialog muss nicht im Html Template verdrahtet werden!
      this.bs.remove(this.book.isbn).subscribe( // Subscribe muss aufgerufen werden, da sonst kein Löschrequest verschickt wird
        e => this.router.navigate(['../'], {relativeTo: this.route})); // User wird weitergeleitet, mit einem relativen Pfad
    }

  }

  // showBookList(): void {
  //   this.showListEvent.emit();
  // }
}
