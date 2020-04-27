import { Component, ViewChild, Input } from '@angular/core';
import { PanelBarItemComponent, PanelBarItemModel } from '@progress/kendo-angular-layout';

@Component({
  selector: 'slide-accordion',
  templateUrl: './slide-accordion.component.html'
})
export class SlideAccordionComponent {
  @ViewChild(PanelBarItemComponent) private panelBarItem: PanelBarItemComponent;
  @Input() title: string;
  @Input() expanded: boolean;

  onStateChange(event: Array<PanelBarItemModel>) {
    this.expanded = event[0].expanded;
  }

  onValueChange(event: any) {
    this.panelBarItem.expanded = event;
  }
}
