import { Directive, Input, SimpleChanges, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[checkbox-toggle]'
})
export class CheckboxToggleDirective {
  private valueAccessor: ControlValueAccessor;

  constructor(@Inject(NG_VALUE_ACCESSOR) private valueAccessors: ControlValueAccessor[])
  { 
    this.valueAccessor = valueAccessors[0];
  }

  @Input() checkboxesToToggle: boolean[];

  ngOnInit() {
    setTimeout(() => this.changeToggle(this.checkboxesToToggle), 50); //The timeout fixes a bug, where the initial value of the toggle is not correctly set 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.checkboxesToToggle) {
      this.changeToggle(changes.checkboxesToToggle.currentValue as boolean[]);
    }
  }

  changeToggle(children: boolean[]) {
    let everyChildSelected: boolean = children.every(checked => checked);

    this.valueAccessor.writeValue(everyChildSelected);
  }
}