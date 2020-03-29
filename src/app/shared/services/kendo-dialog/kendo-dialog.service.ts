import { Injectable, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import * as KendoAngularDialog from '@progress/kendo-angular-dialog';
import { DialogService } from '../abstracts/dialog.service';
import { KendoInfoDialogComponent } from './components/kendo-info-dialog/kendo-info-dialog.component';
import { DialogSettingsModel } from '../../models/dialog/dialog-settings-model';
import { KendoWarningDialogComponent } from './components/kendo-warning-dialog/kendo-warning-dialog.component';
import { KendoConfirmDialogComponent } from './components/kendo-confirm-dialog/kendo-confirm-dialog.component';
import { DialogSize } from '../../enums/dialog-size';
import { DialogContentBase } from '@progress/kendo-angular-dialog';

@Injectable({
  providedIn: 'root'
})
export class KendoDialogService extends DialogService {

  constructor(private dialogService: KendoAngularDialog.DialogService) {
    super();
  }

  info(settings: DialogSettingsModel): Observable<KendoAngularDialog.DialogResult> {
    const dialogRef = this.openDialog(settings, KendoInfoDialogComponent);
    return dialogRef.result;
  }

  warning(settings: DialogSettingsModel): Observable<KendoAngularDialog.DialogResult> {
    const dialogRef = this.openDialog(settings, KendoWarningDialogComponent);
    return dialogRef.result;
  }

  confirm(settings: DialogSettingsModel): Observable<KendoAngularDialog.DialogResult> {
    const dialogRef = this.openDialog(settings, KendoConfirmDialogComponent);
    return dialogRef.result;
  }

  openDialog(settings: DialogSettingsModel, content: typeof DialogContentBase): KendoAngularDialog.DialogRef {

    const dialogRef = this.dialogService.open({
      content: content,
      width: settings.width ? settings.width : this.getDialogWidth(settings.size),
      height: settings.height
    });

    const dialog = dialogRef.content.instance;
    dialog.title = settings.title;
    dialog.content = settings.content;

    return dialogRef;
  }

  private getDialogWidth(size: DialogSize): string {
    switch (size) {
      case DialogSize.Small:
        return "20rem";
      case DialogSize.Medium:
        return "30rem";
      case DialogSize.Large:
        return "50rem";

      default:
        return this.getDialogWidth(DialogSize.Medium);
    }
  }
}