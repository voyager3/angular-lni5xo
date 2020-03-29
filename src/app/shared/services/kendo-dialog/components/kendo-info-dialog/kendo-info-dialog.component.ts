import { Component, Input } from '@angular/core';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { DialogResultModel } from '../../../../models/dialog/dialog-result-model';

@Component({
  selector: 'kendo-info-dialog',
  templateUrl: './kendo-info-dialog.component.html'
})
export class KendoInfoDialogComponent extends DialogContentBase {
  
  @Input() public title: string;
  @Input() public content: string;

  constructor(private dialogInstance: DialogRef) {
    super(dialogInstance);
  } 

  public onDialogClose(): void {
    this.dialog.close(new DialogResultModel(true));
  }
}
