import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(e: Event) {
    const dropdown = this.elemRef.nativeElement.contains(e.target);
    if (dropdown) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
    }
  }


  constructor(private elemRef: ElementRef) {}
}