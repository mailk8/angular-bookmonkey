import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as BookActions from './book.actions';
import {BookStoreService} from '../../shared/book-store.service';

@Injectable()
export class BookEffects {

  constructor(private actions$: Actions, private bookService: BookStoreService) {} // actions$ liefert alle Actions, die in der Anwendung auftreten

  loadBooks$ = createEffect(() => { // Erzeugt ein Observable mit createEffect, die von NgRx aufgerufen wird
        return this.actions$.pipe(

            ofType(BookActions.loadBooks),  // Filter: reagiert nur auf Actions vom Typ loadBooks (loadBooks = ActionCreator)

            switchMap(() => // Flattening Operator: Wird die Buchliste bereits geladen und erneut angefordert, soll nur das Ergebis der letzten Anforderung weiterbearbeitet werden
                  this.bookService.getAll().pipe( // getAll liefert wieder ein Observable
                          map(books => BookActions.loadBooksSuccess({ data: books })), // Result aus getAll wird in {data: ...} in eine neue Action 'loadBooksSuccess' verpackt
                          catchError(error => of(BookActions.loadBooksFailure({ error })))  // Action 'loadBooksFailure'
                          // Actions werden automatisch in den Store dispatched, die Methode soll nicht im Effect aufgerufen werden
                  )
            )
        );
  });
/*

						...................................
						:												      		:
						:						Redux					     		:
						:					S T O R E			   	  		:
						:												   	  		:
	 dispatch	:   											     		:
			+----------------> ACTION ---------------------------------------+
			|			:								|					    		:				                 |
			|			:								|					     		:				                 |
			|			:								|				   	  		:				                 |
			|			:								V					   	    : 	    dispatch		     V
COMPONENT		:							REDUCER	<-- ACTION <--------------------- EFFECT
			^			:								|					   	  	:		             			^
			|			:								|					    		:		            			|		|
			|			:								|					    		:		             			|		|
			|			:								|					    		:		             			|		|
			|			:								|					    		:		                 			V
			+-------- STATE <-----+                 :                    WebServer
	Selector  :   											     		:
						:														     	:
						:														     	:
						:														    	:
						...................................

 */
}
