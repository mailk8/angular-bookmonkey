import { createAction, props } from '@ngrx/store';
import {Book} from '../../shared/book';
import {HttpErrorResponse} from '@angular/common/http';

/*
  Legt man das Feature mit dem Parameter api ( also für Api Calls ) an, werden die Create Action Methoden weitgehend vorausgefüllt
  ng g feature book/store/book --module book/books --api --defaults
 */
export const loadBooks = createAction(
  '[Book] Load Books'
);

export const loadBooksSuccess = createAction( // loadBooksSuccess ist selbst noch keine Action
  '[Book] Load Books Success',    // '[Quelle] einzigartigerName'
  props<{ data: Book[] }>()              // Payload mit dem Typ Json mit "Attribut data und Inhalt Book Array"
);

export const loadBooksFailure = createAction(
  '[Book] Load Books Failure',
  props<{ error: HttpErrorResponse }>() // Hier sollte eigentlich ein serialisierbares Error-Objekt stehen
);
