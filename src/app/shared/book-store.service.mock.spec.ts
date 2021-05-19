import {TestBed, inject} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Book} from '../shared/book';
import {BookStoreService} from './book-store.service';

/*
      Mock
			Ist  ein kontrollierbarer Ersatz für Abhängigkeiten. Unterschied: man kann eine Erwartung
			( expect() ) gegen den Mock ausführen. Der Mock prüft das Verhalten des getesteten Systems. Z.B.
			bedient sich ein gestester Server an der richtigen Datenquelle? Wird ein HttpRequest ausgeführt
			oder auf hartcodierte Daten zurückgegeriffen. Wurde tatsächlich POST genutzt? Siehe Loc 54
			-> Tut das Objekt etwas und das auf die richtige Weise?
 */

describe('BookStoreService', () => {
  const expectedBooks = [
    {
      isbn: '111',
      title: 'Book 1',
      authors: [],
      published: new Date()
    },
    {
      isbn: '222',
      title: 'Book 2',
      authors: [],
      published: new Date()
    }
  ];
  let httpMock;
  beforeEach(() => {
    httpMock = {
      get: () => of(expectedBooks)
    };

    spyOn(httpMock, 'get').and.callThrough();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpMock
        },
        BookStoreService
      ]
    });
  });
  it('should GET a list of all books',
    inject([BookStoreService],
      (service: BookStoreService) => {
        let receivedBooks: Book[];
        service.getAll().subscribe(b => receivedBooks = b);
        expect(httpMock.get).toHaveBeenCalledTimes(1);
        expect(httpMock.get).toHaveBeenCalledWith('https://api4.angular-buch.com/books');
      }));
});
