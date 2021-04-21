import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BasicModel } from '../../../models';

@Component({
  selector: 'v3-likert-scale-item',
  templateUrl: './likert-scale-item.component.html'
})
export class LikertScaleItemComponent {

  @Input() headerTitle: string;
  @Input() items: BasicModel[] = []
  @Input() model: any = {}
  @Output() onOptionCheck: EventEmitter<any> = new EventEmitter();

  onChange = (): void => {
    this.onOptionCheck.emit(this.model);
  }

}