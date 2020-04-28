import { Directive, Input, SimpleChanges, Inject, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Directive({
  selector: '[activated-checkbox]'
})
export class ActivatedCheckboxDirective {
  private valueAccessor: ControlValueAccessor;

  constructor(
    @Inject(NG_VALUE_ACCESSOR) private valueAccessors: ControlValueAccessor[],
    private elementRef: ElementRef,
    private renderer: Renderer2)
  { 
    this.valueAccessor = valueAccessors[0];
  }

  @Input() activator: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activator) {
      this.valueAccessor.writeValue(false);

      if (changes.activator.currentValue) {
        this.activate();
      }
      else {
        this.deactivate();
      }
    }
  }

  activate() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'inline-block');

    for (let label of this.elementRef.nativeElement.labels)
      this.renderer.setStyle(label, 'display', 'inline-flex');
  }

  deactivate() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    
    for (let label of this.elementRef.nativeElement.labels)
      this.renderer.setStyle(label, 'display', 'none');
  }
}
