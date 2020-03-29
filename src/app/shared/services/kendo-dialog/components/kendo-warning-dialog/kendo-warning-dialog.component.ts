import { Component, OnInit, Input } from '@angular/core';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';
import { DialogResultModel } from '../../../../models/dialog/dialog-result-model';

@Component({
  selector: 'kendo-warning-dialog',
  templateUrl: './kendo-warning-dialog.component.html'
})
export class KendoWarningDialogComponent extends DialogContentBase {

  @Input() public title: string;
  @Input() public content: string;

  constructor(private dialogInstance: DialogRef) {
    super(dialogInstance);
  }

  public onDialogClose(): void {
    this.dialog.close(new DialogResultModel(true));
  }

}
