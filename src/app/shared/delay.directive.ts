// Direktive, die ein verzögertes Einblenden von UI Elementen bewirkt
import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[bmDelay]'
})
export class DelayDirective implements OnInit{

  @Input() bmDelay: number; // Input Darstellungsverzögerung in ms

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    setTimeout(() => { this.viewContainerRef.createEmbeddedView(this.templateRef); }, this.bmDelay);
  }

}
