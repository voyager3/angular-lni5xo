import { Component, Input, HostBinding } from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'auto-complete-option',
  templateUrl: './auto-complete-option.component.html'
})

export class AutoCompleteOptionComponent implements Highlightable{

  @Input() option: any;
  @Input() disabled = false;
  private _isActive = false;

  @HostBinding('class.active') get isActive() {
    return this._isActive;
  };

  setActiveStyles(): void {
    this._isActive = true;
  };

  setInactiveStyles(): void {
    this._isActive = false;
  }

  getLabel(): string {
    return this.option.name;
  }

}