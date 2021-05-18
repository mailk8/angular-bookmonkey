// Formularcontroller Bücher editieren und erstellen
// Umgestellt von TemplateDrivenForms auf ReactiveForms
import {Component, OnInit, Output, EventEmitter, ViewChild, Input, OnChanges} from '@angular/core';
import {Book} from '../../shared/book';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Thumbnail} from '../../shared/thumbnail';
import {BookFactory} from '../../shared/book-factory';
import {BookExistsValidatorService} from '../shared/book-exists-validator.service';
import {BookValidators} from '../shared/book-validators';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnChanges {

  // ---> gehört zu TemplateDriven Ansatz, wurde ersetzt durch Reactive Forms ( behalten zu Anschauungszwecken )
  // book = BookFactory.empty();
  @ViewChild('bookForm', { static: true }) bookFormTemplateDriven: NgForm; // Referenz auf UI Element #bookForm, Nutzung in TemplateDrivenForms
  // <----

  bookForm: FormGroup;

  @Input() book: Book;
  @Input() editing = false; // Wird das Formular gerade zum Editieren oder zum Neuanlegen geneutz?
  @Output() submitBook = new EventEmitter<Book>();

  constructor(private fb: FormBuilder, private bookExistsValidator: BookExistsValidatorService, private authorValidator: BookValidators) {}

  ngOnChanges(): void {
    // Methode läuft im Lifecycle vor OnInit
    this.initForm();
    this.setFormValues(this.book);
  }

  ngOnInit(): void {
    // Methode läuft im Lifecycle nach OnChange
    this.initForm();
    const fc: FormControl = new FormControl();
  }

  // FORMGROUP FÜR BOOKFORMULAR
  initForm(): void {
    if (this.bookForm) { return; } // Formular darf nicht versehentlich überschrieben werden
    // initialer Aufbau des Formularmodells, die Felder sollen immer zumindest mit empty String belegt werden
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      // Feld isbn darf nicht bearbeitet werden, wenn das Buch editiert wird. Dann taucht es aber auch nicht in bookform.value auf
      // isbn: [{ value: '', disabled: this.editing }, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      isbn: [{ value: '', disabled: this.editing }, [Validators.required, BookValidators.isbnFormat], this.editing ? null : [this.bookExistsValidator]],
      description: [''],
      authors: this.buildAuthorsArray(['']), // Hier kann man zwar einen Validator anhängen, aber der bekommt nicht das Array reingereicht, sondern einzelne FormControls
      thumbnails: this.buildThumbnailsArray([{title: '', url: ''}]),
      published: []
    });
  }




  setFormValues(book: Book): void {
    // Nach dem Initialisieren des Formulars werden die Felder zum Editiren mit Buchdaten gefüllt
    this.bookForm.patchValue(book);
    // Hier werden die Arrays neu gebaut, weil nach dem initialisieren nichth die passende Anzahl an Controls in den Arrays vorhanden sind
    this.bookForm.setControl('authors', this.buildAuthorsArray(book.authors));
    this.bookForm.setControl('thumbnails', this.buildThumbnailsArray(book.thumbnails));
  }

  // Methoden für dynamische Formularfelder Thumbnails und Authors. Man kann durch einen + Button
  // beinahe beliebig viele Datensätze hinzufügen. Daher werden hier Arrays als Eingangsdatenstruktur verwendet.
  private buildAuthorsArray(values: string[]): FormArray {
    // FormBuilder erzeugt ein FormArray mit jeweils einem FormControl für jeden Author-String aus dem values Array
    return this.fb.array(values,
      BookValidators.atLeastOneAuthor);
  }

  private buildThumbnailsArray(values: Thumbnail[]): FormArray {
    // FormBuilder erzeugt ein Array, jedes Element des Arr. ist eine FormGroup. Grund: Thumbnail besteht aus URL und Bildtitel
    return this.fb.array(values.map(e => this.fb.group(e)));
  }

  get authors(): FormArray {
    // as FormArray ist ein Casting. Der Compiler kann nicht feststellen, welchen Typ wir mit der Übergabe des Literals "authors" aus dem Array fischen.
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

  addAuthorControl(): void {
    // Fügt ein neues leeres FormControl in die Liste der Autoren ein
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl(): void {
    // Fügt eine neue FormGroup in die Liste der Thumbnails ein
    this.thumbnails.push(this.fb.group({url: '', title: ''}));
  }

  submitForm(): void { // Im Formular ist mit dem Event (ngSubmit) eingestellt, dass diese Methode bei Buttonklick gerufen wird
    const formValue = this.bookForm.value;
    const isbn = this.editing ? this.book.isbn : formValue.isbn;
    const authors = formValue.authors.filter(keineLeerenFelder => keineLeerenFelder);
    const thumbnails = formValue.thumbnails.filter(keineLeerenFelder => keineLeerenFelder.url);
    const newBook: Book = {...formValue, authors, thumbnails, isbn}; // Isbn wird separat gesetzt, da sie beim Editieren nicht aufs UI kommt (disabled)
    this.submitBook.emit(this.bookForm.getRawValue()); // Veröffentlichen eines Events, wird aufgefangen im Template der Elternkomponente Create Book und dort weitergeleitet
    // this.submitBook.emit(this.book); // TemplateDriven Ansatz
    // this.book = BookFactory.empty(); // TemplateDriven Ansatz
    this.bookForm.reset(); // Obwohl der User durch die create-book-component nach dem Absenden weitergeleitet wird, wird das Formular zurückgesetzt (Sicherheit)
  }


}
