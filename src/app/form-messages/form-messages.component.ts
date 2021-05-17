// Empfängt FormControl und wertet den Zustand aus
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'bm-form-messages',
  templateUrl: './form-messages.component.html',
  styleUrls: ['./form-messages.component.css']
})

export class FormMessagesComponent implements OnInit {
  @Input() control: AbstractControl; // Kontrollelement
  @Input() controlName: string; // Bezeichnung des Kontrollelements für Meldungsauswahl

  private allMessages = {
    title: { // Bezeichnung des Formularfelds, auf das sich die Meldung bezieht
      required: 'Ein Buchtitel muss angegeben werden.'
    },
    isbn: {
      required: 'Es muss eine ISBN angegeben werden.',
      isbnFormat: 'Die ISBN muss aus 10 oder 13 Ziffern bestehen.',
      isbnExists: 'Die ISBN existiert bereits.'
    },
    published: {
      required: 'Es muss ein Erscheinungsdatum angegeben werden.'
    },
    authors: {
      atLeastOneAuthor: 'Es muss ein Autor angegeben werden.'
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  errorsForControl(): string[] { // gibt Fehlernachrichten in einem Array an das Template aus

    const messages = this.allMessages[this.controlName]; // holt Message(s) zu Fehlerfeld.

    console.log('-------------------------------------------------------------------------------------');
    console.log('controlName = Feldbezeichnung: ' + this.controlName + ' Wert: ' + this.control.value);
    console.log(`messages = mögliche Errormessages zum Feld: ` + JSON.stringify(messages));
    console.log(`control errors = Validierung bemängelt: ` + JSON.stringify(this.control.errors));
    console.log(`control value = Eingabewert war: ` + JSON.stringify(this.control.value));
    try {
      console.log('Object.keys(this.control.errors) ist ' + Object.keys(this.control.errors));
    } catch (e) { console.log('Object.keys(this.control.errors): Validierung hat im Feld ' + this.controlName + ' keine Fehler gefunden.');
    }
    console.log(`Feld wurde bearbeitet? ${this.control.dirty}`);
    console.log('-------------------------------------------------------------------------------------');


    if (
      !this.control || // wenn es kein Control gibt braucht man nicht auf Fehler prüfen
      !messages || // Gibts es für das Feld keine Messages braucht man erst garnicht auf Fehler zu prüfen
      !this.control.errors || // enthält das Control Errors?
      !this.control.dirty // wenn das Feld nicht bearbeitet wurde, wird keine Errormessage dargestellt
    ) { return null; } // keine Fehler sind entstanden

    return Object.keys(this.control.errors) // ???
      .map(err => messages[err]);
  }
}
