import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { BasicModel } from '../../../core/models/basic-model';

@Component({
  selector: 'v3-self-assessment-levels',
  templateUrl: './self-assessment-levels.component.html'
})
export class SelfAssessmentLevelsComponent {
  @Input() selfAssessmentLevels: BasicModel[] = [];
  @Output() onOptionCheck: EventEmitter<any> = new EventEmitter();

  selectedLevelId: number;

  onChange = (levelId: number): void => {
    this.onOptionCheck.emit(levelId);
  }
  
}