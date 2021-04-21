import { Component, Input } from '@angular/core';
import { CompetencyValidationLevelColorClass } from '../../../core/consts';
import { CompetencyValidationLevelEnum } from '../../../core/enums';
import { numberToLetters } from '../../functions';
import { CriteriaCategoryViewModel } from '../../models';

@Component({
  selector: 'v3-competency-criterias-view',
  templateUrl: './competency-criterias-view.component.html'
})
export class CompetencyCriteriasViewComponent {

  @Input() categories: CriteriaCategoryViewModel[];
  @Input() isValidationAttempt: boolean = false;

  CompetencyValidationLevelClass: any = CompetencyValidationLevelColorClass;
  CompetencyValidationLevel: typeof CompetencyValidationLevelEnum = CompetencyValidationLevelEnum;
  isVisibleLegend: boolean = false;

  buildCriteriaPrefix(order: number, sequence: number): string {
    return `${order}.${numberToLetters(sequence)}`;
  }

  showLegend():void {
    this.isVisibleLegend = true;
  }

  cancel(): void {
    this.isVisibleLegend = false;
  }

}
