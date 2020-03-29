import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-error',
  templateUrl: './form-error.component.html'
})
export class FormErrorComponent {
  @Input() inputLabel = '';
  @Input() model: any = {};

  get modelName(): string {
    if(this.model.name) {
      let modelName = this.model.name.replace(/'/g, '');
      return modelName[0].toUpperCase() + modelName.substr(1);
    }
    return '';
  }

}