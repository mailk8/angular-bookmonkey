import { Action, createReducer, on } from '@ngrx/store';
import * as BookActions from './book.actions';
import {Book} from '../../shared/book';

export const bookFeatureKey = 'book';

export interface State {  // Struktur der Feature-Daten im zentralen State-Objekt
  books: Book[];
  loading: boolean;
}

export const initialState: State = { // Initialbefüllung für dieses Feature im State-Objekt
  books: [],
  loading: false
};


export const reducer = createReducer(
  initialState,

  on(BookActions.loadBooks, state => ({ ...state, loading: true})), // Kopie von state herausgeben und Ladeindikator auf true setzen



  on(BookActions.loadBooksSuccess, (state, action) => ({ ...state, books: action.data, loading: false})), // Return aus Action wird in das zentrale State Objekt geschrieben ?



  on(BookActions.loadBooksFailure, (state, action) => ({ ...state, loading: false}))

);
