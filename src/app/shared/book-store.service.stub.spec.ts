import {TestBed, inject} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Book} from '../shared/book';
import {BookStoreService} from './book-store.service';

/*
  		Stub
			Ist ein kontrollierbarer Ersatz für eine Abhängigkeit. Er hat vordefinierte Eigenschaften und Rückgabewerte.
			Der Stub testet den Endzustand des Testobjekts.
			-> Sind die ermittelten Werte oder beschafften Daten korrekt ?
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
  let httpStub;
  beforeEach(() => {
    httpStub = {
      get: () => of(expectedBooks)
    };
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpStub
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
        expect(receivedBooks.length).toBe(2);
        expect(receivedBooks[0].isbn).toBe('111');
        expect(receivedBooks[1].isbn).toBe('222');
      }));
});
