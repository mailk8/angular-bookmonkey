// Direktive, die Zoom von UI Elementen bewirkt
import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[bmZoom]'
})
export class ZoomDirective {

  @HostBinding('class.small') isZoomed: boolean; // Schaltet Zoom-CSS auf dem Element ein oder aus

  @HostListener('mouseenter') onMouseEnter(): void {
    this.isZoomed = true;
  }
  @HostListener('mouseleave') onMouseLeave(): void {
    this.isZoomed = false;
  }

}
