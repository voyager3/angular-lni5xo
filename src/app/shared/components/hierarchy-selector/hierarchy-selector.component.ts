import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HealthSystemHierarchyModel } from '../../models/hierarchies.model';
import { HierarchySelectorFilter } from '../../models/hierarchy-selector-filter.model';
import { LocationItem } from '../../enums/location-item.enum';

@Component({
  selector: 'hierarchy-selector',
  templateUrl: './hierarchy-selector.component.html'
})
export class HierarchySelectorComponent {

  @Input() healthSystemHierarchy: HealthSystemHierarchyModel[];
  @Input() showAsRow: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() showChildOnSelect: boolean = false;
  @Input() selectedHealthSystemsIds: number[] = [];
  @Input() selectedFacilitiesIds: number[] = [];
  @Input() selectedDepartmentsIds: number[] = [];
  @Input() closeOnSelect: boolean = false;

  @Output() healthSystemValueChange: EventEmitter<number[]> = new EventEmitter();
  @Output() facilityValueChange: EventEmitter<number[]> = new EventEmitter();
  @Output() departmentValueChange: EventEmitter<number[]> = new EventEmitter();
  @Output() onFilterChange: EventEmitter<HierarchySelectorFilter> = new EventEmitter();

  healthSystems: any[] = [];
  facilities: any[] = [];
  departments: any[] = [];
  filter: HierarchySelectorFilter;
  locationItems = LocationItem;

  ngOnChanges(){
    if(this.healthSystemHierarchy){
      this.healthSystems = this.healthSystemHierarchy.map(h => ({ id: h.id, name: h.name }));

      if(this.selectedHealthSystemsIds.length > 0){
        this.onHealthSystemChange(this.selectedHealthSystemsIds);
      }
    }
  }

  onHealthSystemChange(healthSystemIds: number[]): void {
    let facilitiesArr = this.healthSystemHierarchy
      .filter(h => healthSystemIds.indexOf(h.id) !== -1)
      .map(h => h.facilities);

    this.facilities = [].concat(...facilitiesArr);
    this.selectedFacilitiesIds = this.applySelection(this.facilities, this.selectedFacilitiesIds);

    let departmentsArr = this.facilities
      .filter(f => this.selectedFacilitiesIds.indexOf(f.id) !== -1)
      .map(f => f.departments);

    this.departments = [].concat(...departmentsArr);
    this.selectedDepartmentsIds = this.applySelection(this.departments, this.selectedDepartmentsIds);

    this.healthSystemValueChange.emit(this.selectedHealthSystemsIds);
    this.facilityValueChange.emit(this.selectedFacilitiesIds);
    this.departmentValueChange.emit(this.selectedDepartmentsIds);
    
    this.emitFilter();
  }

  onFacilityChange(facilityIds: number[]): void {
    let departmentsArr = this.facilities
      .filter(f => facilityIds.indexOf(f.id) !== -1)
      .map(f => f.departments);

    this.departments = [].concat(...departmentsArr);
    this.selectedDepartmentsIds = this.applySelection(this.departments, this.selectedDepartmentsIds);

    this.facilityValueChange.emit(this.selectedFacilitiesIds);
    this.departmentValueChange.emit(this.selectedDepartmentsIds);

    this.emitFilter();
  }

  onDepartmentChange(departmentIds: number[]): void {
    this.departmentValueChange.emit(this.selectedDepartmentsIds);
    this.emitFilter();
  }

  isItemSelected(locationItem: LocationItem, itemId: number): boolean {
    switch(locationItem){
      case LocationItem.HealthSystem:
        return this.selectedHealthSystemsIds.some(id => id === itemId);
      case LocationItem.Facility:
        return this.selectedFacilitiesIds.some(id => id === itemId);
      case LocationItem.Department:
        return this.selectedDepartmentsIds.some(id => id === itemId);
      default: 
        throw 'Invalid location item';
    }
  }

  private applySelection(sourceList: any[], selectedList: any[]): any[] {
    return selectedList
      .filter(selectedId => sourceList.map(d => d.id).indexOf(selectedId) !== -1);
  }

  private emitFilter(): void {
    this.filter = new HierarchySelectorFilter(
      this.selectedHealthSystemsIds, 
      this.selectedFacilitiesIds, 
      this.selectedDepartmentsIds
    );

    this.onFilterChange.emit(this.filter);
  }

}
