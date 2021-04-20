import { State, SortDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { PagerSettings, PageChangeEvent, GridDataResult, SortSettings } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';

export abstract class GridService {
    abstract sortChange(sort: SortDescriptor[], gridState: State): void;
    abstract pageChange({ skip, take }: PageChangeEvent, gridState: State): void;
    abstract filterChange(filter: CompositeFilterDescriptor, gridState: State): void;
    abstract orderGridData(gridData: any[], gridState: State): GridDataResult;
    abstract firstPageActive(gridState: State): void;
    abstract getPageSettings(): PagerSettings;
    abstract getStateSettings(): State;
    abstract getSortSettings(): SortSettings;
}