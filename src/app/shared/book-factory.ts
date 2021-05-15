// Diese Factory wurde angelegt um das Datenformat Book vom Backendserver in das des Frontend zu transformieren.
// Verwendung im Book Service und im BookCreate Template
import {BookRaw} from './book-raw';
import {Book} from './book';

export class BookFactory {

  static fromRaw(b: BookRaw): Book {
    return {
      ...b, // Spread Operator der ein Buch Objekt einfach kopiert
      published: new Date(b.published) // Hier wird in dem Kopierten Objekt das Feld Published von String zu Date überführt
    };
  }

  static empty(): Book {
    return {
      isbn: '',
      title: '',
      authors: [''],
      published: new Date(),
      subtitle: '',
      rating: 0,
      thumbnails: [
        {url: '', title: ''}
      ],
      description: ''
    };
  }
}
