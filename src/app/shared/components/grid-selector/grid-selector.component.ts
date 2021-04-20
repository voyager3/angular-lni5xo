import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { GridSelectorDataModel, GridSelectorDataEntryModel } from '../../models';
import { LifecycleStatusEnum } from '../../enums';
import { GridDataResult, PagerSettings, SortSettings, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State, CompositeFilterDescriptor, SortDescriptor, filterBy } from '@progress/kendo-data-query';
import { GridService } from '../../services';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'grid-selector',
  templateUrl: './grid-selector.component.html'
})
export class GridSelectorComponent implements OnChanges {

  @Input() label: string = "";
  @Input() selected: number;
  @Input() data: GridSelectorDataModel;
  @Input() name: string;
  @Input() disabled: boolean = false;
  @Input() pageSize: number = 5;
  @Output() selectedChange: EventEmitter<number> = new EventEmitter<number>();

  dataEntries: GridSelectorDataEntryModel[] = [];

  textFilter: CompositeFilterDescriptor = {
    logic: 'or',
    filters: []
  };

  gridView: GridDataResult;
  pageSettings: PagerSettings;
  gridState: State;
  sortSettings: SortSettings;

  constructor(private gridService: GridService) { 
    this.pageSettings = this.gridService.getPageSettings();
    this.gridState = this.gridService.getStateSettings();
    this.sortSettings = this.gridService.getSortSettings();
    this.augmentPaging();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.data?.currentValue) {
      this.dataEntries = cloneDeep(this.data.entries);

      if (changes?.selected?.currentValue) {
        this.swapSelected();
      }

      this.updateData();
    }
  }

  getActiveVersions(dataId: number): string {
    let result = '';
    let entry: GridSelectorDataEntryModel = this.data.entries.find(e => e.id === dataId);

    if (entry) {
      let activeVersions = entry.versions.filter(version => version.lifecycleStatusId === LifecycleStatusEnum.Active);
      result = activeVersions
        .map(version => entry.name + ' V' + version.versionNumber)
        .join(', ');
    }

    return result;
  }

  swapSelected() {
    let index = this.data.entries.findIndex(e => e.id === this.selected);
    if (index > 0) {
      let element = this.data.entries[index];
      this.data.entries.splice(index, 1);
      this.data.entries.unshift(element);
    }
  }

  private augmentPaging() {
    let pageSizes: number[] = <number[]>this.pageSettings.pageSizes;
    if (!pageSizes.some(ps => ps === this.pageSize)) {
      this.pageSettings.pageSizes = [this.pageSize, ...<number[]>this.pageSettings.pageSizes];
      this.gridState.skip = 0;
      this.gridState.take = this.pageSize;
    }
  }

  onTextFilterChange(filter: CompositeFilterDescriptor): void {
    this.textFilter = filter;
    this.gridService.firstPageActive(this.gridState);
    this.updateData();
  }

  sortChange(sort: SortDescriptor[]): void {
    this.gridService.sortChange(sort, this.gridState);
    this.updateData();
  }

  pageChange({ skip, take }: PageChangeEvent): void {
    this.gridService.pageChange({ skip, take }, this.gridState);
    this.updateData();
  }

  updateData(): void {
    this.dataEntries = filterBy(this.data.entries, this.textFilter);

    if(this.dataEntries.length <= this.gridState.skip) {
      this.gridState.skip = 0;
    }   

    this.gridView =  {
      data: this.dataEntries.slice(this.gridState.skip, this.gridState.skip + this.gridState.take),
      total: this.dataEntries.length
    };
  }
}