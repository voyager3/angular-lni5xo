import { Component, Input, EventEmitter, Output} from '@angular/core';
import { GrouppedButtonModel } from '../../models';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { LifecycleStatusEnum, ButtonGroupMode } from '../../enums';
import { SliderButtons } from '../../../core/consts/slider-buttons';

@Component({
  selector: 'lifecycle-filter',
  templateUrl: './lifecycle-filter.component.html'
})
export class LifecycleFilterComponent {  
  @Input() column: string;
  @Output() onFilterChange: EventEmitter<CompositeFilterDescriptor> = new EventEmitter();

  lifecycleBtnModel: GrouppedButtonModel[] = [];
  
  filter: CompositeFilterDescriptor = {
    logic: 'or',
    filters: []
  }

  ngOnChanges() {
      this.lifecycleBtnModel = SliderButtons.DraftActiveRetired();
      this.applyFilter();
  }

  applyChange() {
      this.applyFilter();
  }

  private applyFilter() {
    this.filter.filters = [];
    if (this.lifecycleBtnModel.length > 0 && this.lifecycleBtnModel[0].selected)
      this.filter.filters.push({field: this.column, operator: 'eq', value: LifecycleStatusEnum.Draft })

    if (this.lifecycleBtnModel.length > 0 && this.lifecycleBtnModel[1].selected)
      this.filter.filters.push({field: this.column, operator: 'eq', value: LifecycleStatusEnum.Active })

    if (this.lifecycleBtnModel.length > 0 && this.lifecycleBtnModel[2].selected)
      this.filter.filters.push({field: this.column, operator: 'eq', value: LifecycleStatusEnum.Retired })
    
    this.onFilterChange.emit(this.filter);
  }
}
