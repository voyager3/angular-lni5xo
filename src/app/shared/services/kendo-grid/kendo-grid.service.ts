import { Injectable } from '@angular/core';
import { PagerSettings, PageChangeEvent, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { State,SortDescriptor, orderBy, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { GridService } from '../abstracts/grid.service';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class KendoGridService extends GridService { 
 
  constructor() {
    super();
   }

  private pageSettings: PagerSettings = {
    buttonCount: 10,
    info: false,
    type: 'numeric',
    pageSizes: [10,25,50, 100],
    previousNext: true
  };

  private gridState: State = {
    skip: 0,
    take: 10,
    sort: [{ field: 'name', dir: 'asc' }]
  };  

  private sortSettings: SortSettings = {
    allowUnsort: false,
    mode: 'single'
  };

  sortChange(sort: SortDescriptor[], gridState: State): void {
    gridState.sort = sort;
  }

  pageChange({ skip, take }: PageChangeEvent, gridState: State): void {
    gridState.skip = skip;
    gridState.take = take;
  }

  filterChange(filter: CompositeFilterDescriptor, gridState: State): void{
    gridState.filter = filter;
  }

  firstPageActive(gridState: State): void {
    gridState.skip = 0;
  }

  orderGridData(gridData: any[], gridState: State): GridDataResult{
    if(gridData.length <= gridState.skip)
      gridState.skip = 0;

    return {
      data: orderBy(gridData, gridState.sort).slice(gridState.skip, gridState.skip + gridState.take),
      total: gridData.length
    };
  }

  getPageSettings(): PagerSettings{
    return cloneDeep(this.pageSettings);
  }

  getStateSettings(): State{
    return cloneDeep(this.gridState);
  }

  getSortSettings(): SortSettings{
    return cloneDeep(this.sortSettings);
  }
}
