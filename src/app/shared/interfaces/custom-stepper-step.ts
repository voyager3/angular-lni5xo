import { StepperStep } from '@progress/kendo-angular-layout';

export interface CustomStepperStep extends StepperStep {
    step?: number;
    showIndicatorMark?: boolean;
}