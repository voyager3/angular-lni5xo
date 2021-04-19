import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,  
    HttpClientModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class CoreModule { }