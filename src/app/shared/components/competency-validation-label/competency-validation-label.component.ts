import { Component, Input, OnChanges } from '@angular/core';
import { CompetencyValidationStatus } from '../../enums';
import { CompetencyValidationLabelModel } from '../../models';

@Component({
  selector: 'v3-competency-validation-label',
  templateUrl: './competency-validation-label.component.html'
})
export class CompetencyValidationLabelComponent implements OnChanges {

  @Input() model: CompetencyValidationLabelModel = new CompetencyValidationLabelModel();
  @Input() containerClass: string = 'd-inline-block pl-3 pr-3 pt-3 pb-2';

  iconClass: string;
  text: string;

  ngOnChanges(): void {
    if (this.model.validationStatus) {
      this.buildLabel();
    }
  }

  buildLabel = (): void  => {
    switch (this.model.validationStatus) {
      case CompetencyValidationStatus.NotReady:
        this.iconClass = 'icon-disabled'
        this.text =`${this.model.numberOfCompetencies} Not Ready For Validation`;
        break;
      case CompetencyValidationStatus.Ready:
        this.iconClass = 'icon-ready';
        this.text =`${this.model.numberOfCompetencies} Ready For Validation`;
        break;
      case CompetencyValidationStatus.Completed:
        this.iconClass = 'icon-validated';
        this.text =`${this.model.numberOfCompetencies} Validations Complete`;
        break;  
      default: throw 'Unhandled validation status';      
    }
  }

}
