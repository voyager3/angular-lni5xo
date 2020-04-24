import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'kendo-custom-search',
  templateUrl: './kendo-custom-search.component.html'
})
export class KendoCustomSearchComponent {

  @Input() searchableColumns: string[] = [];
  @Output() onFilterChange: EventEmitter<CompositeFilterDescriptor> = new EventEmitter();
  
  searchText: string = '';
  filters: FilterDescriptor[] = [];
  filter: CompositeFilterDescriptor = {
    logic: 'or',
    filters: []
  };

  ngOnChanges() {
    this.searchableColumns
    .forEach(column => this.filters.push({ field: column, operator: 'contains', value: this.searchText }));

    this.filter.filters = this.filters;
  }

  onSearchChange() {
    this.filters.forEach(f => f.value = this.searchText)
    this.onFilterChange.emit(this.filter);
  }

}
