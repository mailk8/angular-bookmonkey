import { Component } from '@angular/core';
import {Book} from './shared/book';

// Steuert BookList BookDetails
type ViewState = 'list' | 'details';

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-bookmonkey';

  book: Book;
  viewState: ViewState = 'list';

  // Wird gerufen durch Button zum Wechseln der Ansicht
  showList(): void {
    this.viewState = 'list';
  }

  showDetails(book: Book): void {
    this.book = book;
    this.viewState = 'details';
  }
}
