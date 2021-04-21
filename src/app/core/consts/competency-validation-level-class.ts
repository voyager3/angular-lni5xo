import { CompetencyValidationLevel, CompetencyValidationLevelEnum } from '../enums';

export const CompetencyValidationLevelClass = {
    [CompetencyValidationLevel.Expert]: 'cl-expert',
    [CompetencyValidationLevel.Proficient]: 'cl-proficient',
    [CompetencyValidationLevel.Competent]: 'cl-competent',
    [CompetencyValidationLevel.AdvancedBeginner]: 'cl-advanced-beginner',
    [CompetencyValidationLevel.Novice]: 'cl-novice'
}

export const CompetencyValidationLevelColorClass = {
    [CompetencyValidationLevelEnum.Expert]: 'cl-expert',
    [CompetencyValidationLevelEnum.Proficient]: 'cl-proficient',
    [CompetencyValidationLevelEnum.Competent]: 'cl-competent',
    [CompetencyValidationLevelEnum.AdvancedBeginner]: 'cl-advanced-beginner',
    [CompetencyValidationLevelEnum.Novice]: 'cl-novice'
}