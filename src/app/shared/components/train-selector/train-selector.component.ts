import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrainSelectorModel } from '../../models/train-selector.model';
import { TrainSelectorMode } from '../../enums/train-selector-mode.enum';

@Component({
  selector: 'train-selector',
  templateUrl: './train-selector.component.html'
})
export class TrainSelectorComponent {  
  @Input() buttons: TrainSelectorModel[] = [];  
  @Output() buttonsChange: EventEmitter<TrainSelectorModel[]> = new EventEmitter<TrainSelectorModel[]>();
  @Input() mode: TrainSelectorMode;
  @Input() showLabel: boolean = true;
  @Input() disabled: boolean = false;
  TrainSelectorMode = TrainSelectorMode;

  selectedChange(selected: boolean, button: TrainSelectorModel) {
    if (this.disabled === false && button.disabled === false) {
      button.selected = !button.selected;
      this.buttonsChange.emit(this.buttons);
    }    
  }
}
