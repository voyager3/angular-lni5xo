import { CompetencyValidationStatus } from '../enums';

export class CompetencyValidationLabelModel {

    constructor(
        public validationStatus?: CompetencyValidationStatus,
        public numberOfCompetencies: number = 0,
        public showText: boolean = true,
        public iconSmall: boolean = false,        
        public globalColor?: string,
    ) { }
}