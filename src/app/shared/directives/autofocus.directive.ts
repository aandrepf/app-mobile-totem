import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  @Input() length: number;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    console.log(this.length);
    this.el.nativeElement.focus();
  }
}
