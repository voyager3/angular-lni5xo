import { Component, Input, ContentChild, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { Align, Collision } from '@progress/kendo-angular-popup';
import { GridMenuActionModel } from '../../models';

@Component({
  selector: 'grid-popup-actions',
  templateUrl: './grid-popup-actions.component.html'
})
export class GridPopupActionsComponent implements OnChanges {
  @Input() actions: GridMenuActionModel[];
  @Input() selectedId: number;
  
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  collision: Collision = { horizontal: 'flip', vertical: 'fit' };
  anchorAlign: Align = { horizontal: "left", vertical: "top" };
  popupAlign: Align = { horizontal: "right", vertical: "top" };
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.actions) {
      this.actions = this.filterActions(this.actions);
    }
  }

  onActionClick(event: {item: GridMenuActionModel}):void {
    if(event.item.callback)
      event.item.callback(this.selectedId, event.item.param)
  }

  private filterActions(actions: GridMenuActionModel[]): GridMenuActionModel[] {
    return actions
      .filter(action => !action.isHidden)
      .map(action => {
        if (action.items?.length) {
          action.items = this.filterActions(action.items);
        }
      return action;
    });
  }
}
