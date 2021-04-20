import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { StepperActivateEvent, StepperComponent } from '@progress/kendo-angular-layout';
import { CustomStepperStep } from '../../interfaces';

@Component({
  selector: 'custom-stepper',
  templateUrl: './custom-stepper.component.html'
})
export class CustomStepperComponent implements OnInit, OnChanges {
  @Input() steps: CustomStepperStep[];
  @Input() currentStep: number = 0;

  @Input() showIndicatorIcons: boolean = false;
  @Input() width: number = 700;
  @Input() containerClass: string = 'stepper-container'

  @Input() previousBtnText = "Previous";
  @Input() nextBtnText = "Next";
  @Input() finishBtnText = "Save and Finish";
  @Input() useFinishButtonInternally: boolean = true;

  @Output() currentStepChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onFinish: EventEmitter<void> = new EventEmitter();
  @Output() allStepsAreValid: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('stepper', { static: true }) public stepper: StepperComponent;

  showPreviousButton: boolean;
  showFinishButton: boolean;
  nextButtonHidden: boolean;

  validStepIndicatorClass = 'k-step-indicator-icon k-icon k-i-check';
  invalidStepIndicatorClass = 'k-step-indicator-icon k-icon k-i-warning';

  ngOnChanges(): void {
    this.steps[this.currentStep].showIndicatorMark = true;
    this.setFinishButton();
  }

  ngOnInit(): void {
    this.setStepsProperties();
    this.setBackButton();
    this.setFinishButton();
  }

  onStepActivate(event: StepperActivateEvent): void {
    event.preventDefault();
  }

  onStepChange(newStep: number): void {
    this.currentStepChange.emit(newStep);
  }

  finish(): void {
    if (this.areStepsValid()) {
      this.onFinish.emit();
    }
  }

  continue(): void {
    this.steps[this.currentStep].showIndicatorMark = true;
    this.currentStep++;
    this.stepper.currentStepChange.emit(this.currentStep);

    this.setBackButton();
    this.setFinishButton();
  }

  back(): void {
    this.steps[this.currentStep].showIndicatorMark = true;
    this.currentStep--;
    this.stepper.currentStepChange.emit(this.currentStep);

    this.setBackButton();
    this.setFinishButton();
  }

  isStepValid(step?: number): boolean {
    let stepperStep: CustomStepperStep;

    if (step || step === 0) {
      stepperStep = this.steps[step];
    } else {
      stepperStep = this.steps[this.currentStep];
    }

    let isValid = !stepperStep.validate ? true : stepperStep.isValid as boolean;
    this.allStepsAreValid.emit(this.areStepsValid());
    return isValid;
  }

  getIndicatorClass(stepperStep: CustomStepperStep): string {
    if (!this.steps[stepperStep.step].showIndicatorMark) {
      return;
    }
    return this.isStepValid(stepperStep.step) ? this.validStepIndicatorClass : this.invalidStepIndicatorClass;
  }

  showNextButton(): boolean {
    return !this.nextButtonHidden && !this.isLastStep();
  }

  private areStepsValid(): boolean {
    if (this.steps.length > 0) {
      return this.steps.every(st => st.isValid);
    }
    return false;
  }

  private setStepsProperties(): void {
    this.steps.forEach((st, index) => {
      st.step = index;
      st.showIndicatorMark = false;
      st.validate = st.validate === undefined ? true : st.validate;
    });
  }

  private setFinishButton(): void {
    this.showFinishButton = this.isLastStep();
  }

  private setBackButton(): void {
    this.showPreviousButton = this.currentStep !== 0;
  }

  private isLastStep(): boolean {
    return this.currentStep === this.steps.length - 1;
  }
}
