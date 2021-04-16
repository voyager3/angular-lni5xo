import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilterDescriptor } from '@progress/kendo-data-query';
import { CardButtonModel } from '../../models/card-button.model';

@Component({
  selector: 'card-button-filter',
  templateUrl: './card-button-filter.component.html'
})
export class CardButtonFilterComponent {

  @Input() cardButtons: CardButtonModel[] = [];
  @Input() column: string;
  @Output() onFilterChange: EventEmitter<FilterDescriptor> = new EventEmitter();

  filter: FilterDescriptor; 

  ngOnChanges(){
    this.applyFilter();
  }

  applySelection(cardBtnId: number){
    this.cardButtons
    .filter(cb => cb.id !== cardBtnId)
    .forEach(cb => cb.selected = false);

    this.applyFilter();
  }

  private applyFilter(){
    if(this.cardButtons.length > 0 && this.cardButtons.some(cb => cb.selected === true)){
      let selectedCard = this.cardButtons.find(cb => cb.selected === true);
      this.filter = { field: this.column, operator: 'eq', value: selectedCard.text };
    }else{
      this.filter = { field: this.column, operator: 'contains', value: '' };
    }

    this.onFilterChange.emit(this.filter);
  }
}