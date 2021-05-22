import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from './book.reducer';

export const selectBookState = createFeatureSelector<fromBook.State>( // fromBook.State ist das Interface das das Slice beschreibt
  fromBook.bookFeatureKey // Feature Key = "book"
);

export const selectBooksLoading = createSelector(
  selectBookState,
  state => state.loading
);

export const selectAllBooks = createSelector(

  selectBookState, // Parameter für Selector

  state => { // Parameter für Projector
    console.log(`createSelector Books, projector für State läuft`);
    return state.books;
  }
);
