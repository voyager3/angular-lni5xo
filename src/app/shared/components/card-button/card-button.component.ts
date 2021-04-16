import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CardButtonModel } from '../../models/card-button.model';

@Component({
  selector: 'card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent {

  
  @Input() model: CardButtonModel = new CardButtonModel();
  @Input() allowSelection: boolean = true;
  @Output() onSelect: EventEmitter<number> = new EventEmitter();

  select() {
    if(this.allowSelection){
      this.model.selected = !this.model.selected;
      this.onSelect.emit(this.model.selected ? this.model.id : null);
    }
    
  }
}