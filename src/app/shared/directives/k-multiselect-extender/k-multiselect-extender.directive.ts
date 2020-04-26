import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { MultiSelectComponent } from '@progress/kendo-angular-dropdowns';
import { NgModel } from '@angular/forms';
import { BasicModel } from '../../../core/models';

const selectAllId = -1;
const deselectAllId = -2;

@Directive({
  selector: '[KMultiselectExtender]'
})
export class KMultiselectExtenderDirective {

  selectedItems: any = [];
  metaItems: BasicModel[] = [
    {id: selectAllId, name: "Check All"},
    {id: deselectAllId, name: "Uncheck All"}
  ]

  @Input() msListItems: any = [];
  @Input() itemsCountToShowSeparately: number = 2;
  @Input() showMetaItems: boolean = true;
  @Output() selectedValuesChange: EventEmitter<any[]> = new EventEmitter();

  constructor(private host: MultiSelectComponent, private ngModel: NgModel) { }

  ngOnInit(){
    this.setupInit();
  }

  ngOnChanges(){
    if(this.msListItems && this.msListItems.length > 0){
      
      if(this.msListItems.length === 1){
        this.selectedItems = [this.msListItems[0].id];
        setTimeout(() => this.updateModel(), 100) // workaround for bug when selecting the only one item
        this.host.disabled = true;
      }else if(this.showMetaItems){
        this.msListItems.unshift(...this.metaItems);
      }
    }

    this.host.data = this.msListItems;
  }

  tagMapper(tags: any[]): any[] {
    return tags.length <= this.itemsCountToShowSeparately  ? tags : [ tags ];
  }

  private setupInit(): void {
    this.host.tagMapper = this.tagMapper.bind(this);
    
    this.host.valueChange
    .subscribe((items:any) => this.applyCustomChanges(items));
  }

  private applyCustomChanges(items: any[]): void {
    if(items.some((i: any) => i === selectAllId)){
      this.selectedItems = [...this.msListItems.filter((i:any) => i.id > selectAllId).map((i:any) => i.id)];
    }else if(items.some((i: any) => i === deselectAllId)){
      this.selectedItems = [];
    }else{
      this.selectedItems = [...items];
    }

    this.updateModel();
  }

  private updateModel(): void {
    this.ngModel.reset(this.selectedItems);
    this.selectedValuesChange.emit(this.selectedItems);
  }

}
