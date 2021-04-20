import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { ApiService } from './services';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,  
    HttpClientModule
  ],
  providers: [
    { provide: ApiService, useClass: ApiService }
  ],
  exports: [
  ]
})
export class CoreModule { }