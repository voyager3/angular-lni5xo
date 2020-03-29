import { Component, Input } from '@angular/core';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { DialogResultModel } from '../../../../models/dialog/dialog-result-model';

@Component({
  selector: 'kendo-confirm-dialog',
  templateUrl: './kendo-confirm-dialog.component.html'
})
export class KendoConfirmDialogComponent extends DialogContentBase {
  @Input() public title: string;
  @Input() public content: string;

  constructor(private dialogInstance: DialogRef) {
    super(dialogInstance);
  }

  public onConfirm(): void {
    this.dialog.close(new DialogResultModel(true));
  }

  public onDeny(): void {
    this.dialog.close(new DialogResultModel(false));
  }
}
