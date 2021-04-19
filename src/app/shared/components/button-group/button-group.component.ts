import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GrouppedButtonModel } from '../../models';
import { ButtonGroupMode } from '../../enums';

@Component({
  selector: 'button-group',
  templateUrl: './button-group.component.html'
})
export class ButtonGroupComponent {

  @Input() cssClass: string = '';
  @Input() buttons: GrouppedButtonModel[];
  @Input() mode: ButtonGroupMode;
  @Input() disabled: boolean = false;
  @Output() buttonsChange: EventEmitter<GrouppedButtonModel[]> = new EventEmitter<GrouppedButtonModel[]>();

  selectedChange(selected: boolean, button: GrouppedButtonModel) {
    this.buttonsChange.emit(this.buttons);
  }
}