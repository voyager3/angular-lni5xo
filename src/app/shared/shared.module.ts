import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { directives } from './directives';
import { dialogComponents } from "./services/kendo-dialog/components";
import { GridService,
        KendoGridService,
        DialogService,
        KendoDialogService 
       } from './services';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { PopupModule } from '@progress/kendo-angular-popup';
import { SortableModule } from '@progress/kendo-angular-sortable';
import { FormsModule } from '@angular/forms';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditorModule } from '@progress/kendo-angular-editor';
import { MenusModule } from '@progress/kendo-angular-menu';

export const kendoUIModules = [
  ButtonsModule,
  BrowserAnimationsModule,
  DropDownsModule,
  InputsModule,
  GridModule,
  DateInputsModule,
  DialogsModule,
  LabelModule,
  LayoutModule,
  TooltipModule,
  SortableModule,
  UploadsModule,
  TreeViewModule,
  PopupModule,
  EditorModule,
  ProgressBarModule,
  MenusModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperModule,
    kendoUIModules
  ],
  declarations: [  ...components, ...directives,  ...dialogComponents ],
  exports: [ ...components, ...directives, ...kendoUIModules],
  providers: [    
    { provide: DialogService, useClass: KendoDialogService },
    { provide: GridService, useClass: KendoGridService }
  ],
  entryComponents: [
    ...dialogComponents
  ]
})
export class SharedModule { }