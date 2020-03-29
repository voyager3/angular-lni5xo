import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';


import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { KendoShowcaseComponent } from './kendo-showcase/kendo-showcase.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule,  ButtonsModule, SharedModule,
  BrowserAnimationsModule,
  DropDownsModule,
  InputsModule,
  GridModule,
  DateInputsModule,
  DialogsModule,
  LabelModule,
  LayoutModule ],
  declarations: [ AppComponent, HelloComponent, KendoShowcaseComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
