import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLoader]'
})
export class AppLoaderDirective implements OnInit {
  @Input() opaque: boolean;
  
  constructor(private el: ElementRef) {
    this.el.nativeElement.className = 'k-i-loading';
  }

  ngOnInit() {
    if (this.opaque) {
      this.el.nativeElement.className += ' opaque';
    }
  }

}
