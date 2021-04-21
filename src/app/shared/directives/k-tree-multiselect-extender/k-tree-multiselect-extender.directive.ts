import { Directive, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { ItemLookup, TreeItemLookup } from '@progress/kendo-angular-treeview';
import { TreeMultiselectComponent } from '../../components/tree-multiselect/tree-multiselect.component';

const selectAllId = -1;
const deselectAllId = -2;

@Directive({
  selector: '[KTreeMultiselectExtender]'
})
export class KTreeMultiselectExtenderDirective implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() showMetaItems: boolean = true;
  @Input() itemsCountToShowSeparately: number = 2;
  @Input() selectedValuePrimitive: boolean = true;
  @Output() selectedValuesChange: EventEmitter<any[]> = new EventEmitter();

  selectedItems: any = [];
  metaItems: any[];

  textField: string;
  valueField: string;

  isSelectedField: string;
  childrenField: string;

  constructor(protected host: TreeMultiselectComponent) { }

  ngOnInit(): void{
    this.setupInit();
  }

  ngOnChanges(): void{
    this.setupData();
  }

  private setupInit = (): void => {

    this.textField = this.host.textField;
    this.valueField = this.host.valueField;

    this.isSelectedField = this.host.isSelectedField;
    this.childrenField = this.host.childrenField;

    this.setupData();

    this.host.checkedKeysChange
      .subscribe((item:TreeItemLookup) => this.applyCustomChanges(item));

    this.host.onClearSelectedItems
      .subscribe(() => {
          this.host.chips = [];
          this.checkUncheckAll(this.data, false);
          this.notify();
      });

    this.host.OnRemoveSelectedItem
      .subscribe((removedItem: any) => {
        
        if(removedItem.item?.clearAll){
          this.host.chips = [];
          this.checkUncheckAll(this.data, false);
        } else {
          this.host.chips.splice(removedItem.index, 1);
          this.uncheckNode(removedItem.item);
        }

        this.notify();
      })
  }

  private setupData() {
    if(this.data?.length){
      if(this.showMetaItems){
        this.metaItems = [
          {id: selectAllId, [this.host.textField]: "Check All"},
          {id: deselectAllId, [this.host.textField]: "Uncheck All"}
        ];
  
        this.data.unshift(...this.metaItems);
      }
    }    

    this.setChipItems();
  }

  private applyCustomChanges = (selectedItem: TreeItemLookup): void => {

    if(selectedItem.item.dataItem?.id && selectedItem.item.dataItem.id === selectAllId){
      this.checkUncheckAll(this.data, true);
    } else if (selectedItem.item.dataItem?.id && selectedItem.item.dataItem.id === deselectAllId){
      this.checkUncheckAll(this.data, false);
    } else {
      this.checkMultiple(selectedItem);
    }

    this.setChipItems();
    this.notify();
  }

  private checkMultiple = (node: TreeItemLookup): void => {
     this.checkNode(node);
     this.checkParents(node.parent);
  }

  private checkNode = (node: TreeItemLookup, check?: boolean): void => {
    let shouldCheck =  this.shouldCheck(node, check);
    node.item.dataItem[this.isSelectedField] = shouldCheck;
    
    if(node?.children){
      node.children.map(n => this.checkNode(n, shouldCheck));
    }
  }

  private checkParents = (parent: ItemLookup): void => {
    let currentParent = parent;

    while (currentParent) {
        if (currentParent?.children && this.allChildrenSelected(currentParent.children)) {
            if (!currentParent.item.dataItem[this.isSelectedField]) {
              currentParent.item.dataItem[this.isSelectedField] = true;
            }
        } else if (currentParent.item.dataItem[this.isSelectedField]) {
          currentParent.item.dataItem[this.isSelectedField] = false;
        }

        currentParent = currentParent.parent;
    }
  }

  private allChildrenSelected = (children: any[]): boolean => {
      const isCheckedReducer = (checked: any, item: any) => (
          checked && this.isItemChecked(item.dataItem)
      );

      return children.reduce(isCheckedReducer, true);
  }

  private shouldCheck = (node: TreeItemLookup, check?: boolean): boolean => {
    let isChecked: boolean = node.item.dataItem[this.isSelectedField];
    
    return check === undefined ? !isChecked : check;
  }

  private isItemChecked = (item: any): boolean => {
    return item[this.isSelectedField] !== undefined ? item[this.isSelectedField] : false;
  }

  private checkUncheckAll = (treearr: any[], check: boolean): void => {
    treearr.forEach(el => {
      if(el?.id <= -1){
        return;
      }

      el[this.isSelectedField] = check;
      if(el[this.childrenField] !== undefined){
        this.checkUncheckAll(el[this.childrenField], check);
      }
    });
  }

  private setChipItems = (): void => {
    this.host.chips = [];
    this.setSelectedChips(this.data);
    if(this.host.chips?.length > this.itemsCountToShowSeparately){
      this.host.chips = [{
        [this.textField]: `${this.host.chips.length} items selected`,
        clearAll: true
      }]
    }
  }

  private notify = (): void => {
    this.selectedItems = [];
    this.initSelectedItems(this.data);
    this.selectedValuesChange.emit(this.selectedItems);
  }

  private initSelectedItems = (dataArray: any[]):void => {
    dataArray.forEach(item => {
      if(item?.id <= -1){
        return;
      }

      if(item[this.isSelectedField] && item[this.isSelectedField] === true &&
           (!item[this.childrenField] || item[this.childrenField].length <= 0)){
        let selectedItem: any = this.selectedValuePrimitive ? item[this.valueField] : item;
        this.selectedItems.push(selectedItem);
      } else if(item[this.childrenField] && item[this.childrenField].length > 0){
        this.initSelectedItems(item[this.childrenField]);
      } else {
        return;
      }
    });
  }

  private setSelectedChips = (dataItems: any[]): any[] => {
    return dataItems.reduce((acc, item) => {
      if(item[this.isSelectedField] && item[this.isSelectedField] === true){
        this.host.chips.push(item);
      }else if(item[this.childrenField] && item[this.childrenField].length > 0){
        const newItems = this.setSelectedChips(item[this.childrenField]);
        if (newItems.length > 0) {
          this.host.chips.push(newItems);
        }
      }

      return acc;
    }, [])
  }

  private uncheckNode = (treeNode: any):void => {
    treeNode[this.isSelectedField] = false;
    if(treeNode[this.childrenField] && treeNode[this.childrenField].length > 0){
      treeNode[this.childrenField].forEach((childNode: any) => {
        this.uncheckNode(childNode);
      });
    }
  }
}
