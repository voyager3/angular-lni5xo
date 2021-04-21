import { Component, Input } from '@angular/core';
import { CompetencyDetailsModel } from '../../models';

@Component({
  selector: 'v3-competency-details-view',
  templateUrl: './competency-details-view.component.html'
})

export class CompetencyDetailsViewComponent {

  @Input() competencyDetails: CompetencyDetailsModel;

  setAbbreviationStyle = (): any => {
    return { "background-color": this.competencyDetails.color }
  }
}