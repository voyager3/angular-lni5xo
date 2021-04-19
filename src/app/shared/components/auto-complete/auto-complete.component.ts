import { Component, Input, QueryList, ViewChildren, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { AutoCompleteOptionComponent } from './auto-complete-option/auto-complete-option.component';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import { BasicModel } from '../../../core/models/basic-model';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'auto-complete',
  templateUrl: './auto-complete.component.html'
})
export class AutoCompleteComponent  {

  @Input() selectedItemId: number
  @Input() rows: number = 3;
  @Input() optionsSource: BasicModel[] = [];
  @Input() placeholder: string;
  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter();
  @ViewChildren(AutoCompleteOptionComponent) items: QueryList<AutoCompleteOptionComponent>;
  
  model = '';
  showDropDown = false;
  options: BasicModel[] = [];
  selectedItem: BasicModel;

  private keyManager: ActiveDescendantKeyManager<AutoCompleteOptionComponent>;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['optionsSource'] && this.optionsSource && this.optionsSource.length > 0)
      this.options = cloneDeep(this.optionsSource);

    if(changes['selectedItemId'] && this.selectedItemId){
      let item: BasicModel = this.optionsSource.find(o => o.id === this.selectedItemId);
      this.selectValue(item);
    }
  }

  ngAfterViewInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.items)
      .withWrap()
      .withTypeAhead();
  }

  filter(): void {
    if(!this.model || this.model.length < 2) {
      this.options = this.optionsSource;
      return;
    }
    
    let result = this.optionsSource.filter((o: BasicModel) => {
      if(!o) return;
        
      return o.name.toLowerCase().indexOf(this.model.toLowerCase()) !== -1;
    });
      
      this.options = result;
  }

  trackByFunc(item: BasicModel): number {
    if(!item) return null;

    return item.id;
  }

  onKeydown(event: any): void {
    if (event.keyCode === ENTER && this.keyManager.activeItem) {
      this.selectValue(this.keyManager.activeItem.option);
    } else {
      this.keyManager.onKeydown(event);
    }
  }

  selectValue(value: BasicModel): void {
    this.model = value.name;
    this.selectedItem = value;
    this.selectedItemChange.emit(this.selectedItem);
    this.showDropDown = false;
    this.filter();

    if(this.keyManager)
    this.keyManager.updateActiveItem(-1);
  }

  closeDropDown(): void {
    setTimeout(() => { this.showDropDown = false }, 100);
  }

  openDropDown(): void {
    this.showDropDown = true;
  }

  selectedOptionChange(value: string): void {
    this.filter();
    this.selectedItemChange.emit(new BasicModel(0, value.trim()));
  }

}
