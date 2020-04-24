import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { directives } from './directives';
import { dialogComponents } from "./services/kendo-dialog/components";
import { KendoDialogService } from './services/kendo-dialog/kendo-dialog.service';
import { DialogService } from './services/abstracts/dialog.service';

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
import { FormsModule } from '@angular/forms';

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
  TooltipModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    kendoUIModules
  ],
  declarations: [  ...components, ...directives,  ...dialogComponents, CardButtonComponent  ],
  exports: [ ...components, ...directives, ...kendoUIModules],
  providers: [    
    { provide: DialogService, useClass: KendoDialogService }
  ],
  entryComponents: [
    ...dialogComponents
  ]
})
export class SharedModule { }