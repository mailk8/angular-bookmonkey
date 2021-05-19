// Integrierter Unittest mit TestBed
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Book } from './book';
import { BookRaw } from './book-raw';
import { BookStoreService } from './book-store.service';

/*
  HttpTestingController ermöglicht Testing, sendet in Wirklichkeit aber nie Requests ab. Es wird ein Observable zurückgegeben.
  Bei einem echten Request würden die Daten asynchron eintreffen. Im Test werden alle Requests in eine Queue gelegt, diese werden
  einzeln abgefragt und entfernt mit expectOne() bzw. expectNone(). Bleibt am Ende ein unerwarteter Request übrig, entsteht ein Testfehler.

  Testphasen
		1	Queue mit Requests aufbauen
		2	Queue abbauen mit httpMock.expectOne() und .expectNone()
		3	Requests emittieren mit flush()
		4	Annahmen treffen
		5	Verifizieren

 */

describe('BookStoreService', () => {  // Beschreibung der Testsuite
  let httpMock: HttpTestingController;
  let service: BookStoreService;

  const bookRaw: BookRaw[] = [
    {
      isbn: '111',
      title: 'Book 1',
      authors: [],
      published: '2019-01-01T00:00:00.000Z'
    },
    {
      isbn: '222',
      title: 'Book 2',
      authors: [],
      published: '2019-01-01T00:00:00.000Z'
    }
  ];

  beforeEach(() => {  // läuft vor jedem Test, also vor jeder it() Methode
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookStoreService]
    });

    httpMock = TestBed.inject(HttpTestingController); // kein isolierter Test sondern ein integrierter
    service = TestBed.inject(BookStoreService);
  });

  it('should GET a list of all books', () => {    // Ein Test

    let receivedBooks: Book[];
    service.getAll().subscribe(books => receivedBooks = books);

    // Request aus der Warteschlange holen
    const req = httpMock.expectOne(
      'https://api4.angular-buch.com/secure/books');
    expect(req.request.method).toEqual('GET');

    // flush -- jetzt werden die Bücher emittiert
    req.flush(bookRaw);

    /*
     Fehlerfall simulieren
     req.flush('Fehler!', {
      status: 500,
      statusText: 'Internal Server Error'
      });
     */

    expect(receivedBooks.length).toBe(2);
    expect(receivedBooks[0].isbn).toBe('111');
    expect(receivedBooks[1].isbn).toBe('222');

    expect(receivedBooks[0].published).toEqual(new Date('2019-01-01T00:00:00.000Z'));
  });

  afterEach(() => {
    // prüfen, ob kein Request übrig geblieben ist
    httpMock.verify();
  });
});
