// Validiert ISBN (regex) und Author (mindestens ein Eintrag)
import {FormControl, FormArray, ValidationErrors, AsyncValidator, Validator, AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';
@Injectable({ providedIn: 'root' })
export class BookValidators implements Validator{

  static isbnFormat(control: FormControl): ValidationErrors | null {
    if (!control.value) { return null; }

    const numbers = control.value.replace(/-/g, '');
    const isbnPattern = /(^\d{10,13}$)/; // 10 - 13 Ziffern sind valid

    if (isbnPattern.test(numbers)) {
      return null;
    }
    else {
      return { isbnFormat: { valid: false } };
    }
  }

  static atLeastOneAuthor(controlArray: FormArray): ValidationErrors | null { // wird null retourniert, war die Vaidation erfolgreich
      if (controlArray.controls.some(el => el.value)) { // Wurden mehrere Eingabefelder für Author vom User erzeugt
        return null;    // und befindet sich mindestens ein String in einem der Felder, ist el.value truthy
      }
      else {
        return { atLeastOneAuthor: { valid: false } }; // ValidationErrors Objekt wird zurückgegeben
      }
  }

  // Validator Methoden dürfen nicht static sein
  validate(contr: AbstractControl): ValidationErrors | null { // Für FormArrays kann man so KEINE Validatoren erstellen. Es wird nämlich ein FormControl übergeben, jedoch nicht das gesamte Array. Es sei denn, man möchte die Einträge des Arrays unabhängig von den weiteren prüfen.
    console.log(`Typ contr: ${contr.constructor.name}`); // loggt "FormControl"
    const controlArray = contr as FormArray;
    console.log(`Typ controlArray: ${controlArray.constructor.name}`); // loggt immeroch "FormControl". OK
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
  }

}
