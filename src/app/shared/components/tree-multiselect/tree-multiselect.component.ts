import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { TreeItemLookup, TreeViewComponent } from '@progress/kendo-angular-treeview';
import { fromEvent, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'v3-tree-multiselect',
  templateUrl: './tree-multiselect.component.html'
})
export class TreeMultiselectComponent implements OnInit, OnChanges {
  @Input() data: any = [];
  @Input() textField: string = 'name';
  @Input() valueField: string = 'id';
  @Input() isSelectedField: string = 'isSelected';
  @Input() childrenField: string = 'items';
  @Input() placeholder: string = 'Select';

  @Output() checkedKeysChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClearSelectedItems: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnRemoveSelectedItem: EventEmitter<any> = new EventEmitter<any>();  

  @ViewChild('treeview', { static: false }) public treeview: TreeViewComponent;
  @ViewChild('searchSpan', { static: false }) public searchSpan: ElementRef<HTMLSpanElement>;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  listItems: any[] = [];
  isOpen: boolean = false;
  searchText: string = '';

  parsedData: any[];

  resizeObservable$: Observable<Event>
  resizeSubscription$: Subscription
  chips: any = [];

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe( () => {
      this.isOpen = false;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && this.data) {
      this.parsedData = this.data;
    }
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe()
  }

  open = (): void => {
    this.isOpen = !this.isOpen;
  }

  clear = (): void => {
    this.searchText = '';
    this.filterChange.emit(this.searchText);
    this.onClearSelectedItems.emit();
  }

  isClearVisible = (): boolean => {
    return this.searchText.length > 0 || this.chips.length > 0;
  }

  onSearchChange = (): void => {
    this.filterChange.emit(this.searchText);
  }

  onRemove = (item: any, index: number):void => {
    let removedItem: any = {
      item: item,
      index: index
    };

    this.OnRemoveSelectedItem.emit(removedItem);
  }

  getChipName = (chip: any):string => {
    return chip[this.textField] !== undefined ? chip[this.textField] : '';
  }

  getName = (dataitem: any):string => {
    return dataitem[this.textField] !== undefined ? dataitem[this.textField] : '';
  }

  getPopupWidth = (): number => {
    return this.searchSpan.nativeElement.offsetWidth;
  }

  getStyleClass = (dataItem: any): string => {
    return dataItem[this.isSelectedField] && dataItem[this.isSelectedField] == true ? 'tree-item-selected' : '';
  }

  getArrowClass = (): string => {
    return !this.isClearVisible() ? 'mr-2' : '';
  }

  children = (dataitem: any): Observable<any[]> => of(dataitem[this.childrenField]);

  hasChildren = (dataitem: any): boolean => !!dataitem[this.childrenField];

  onSelectedValuesChange = (index: any): void => {
    let treeItem: TreeItemLookup = this.treeview.itemLookup(index);
    this.checkedKeysChange.emit(treeItem);
  }

  isVisibleCheckBox = (dataItem: any):boolean => {
      return !dataItem?.id || dataItem.id > -1;
  }

  isItemSelected = (dataItem: any): boolean => {
      return dataItem[this.isSelectedField] !== undefined ? dataItem[this.isSelectedField] : false;
  }
}
