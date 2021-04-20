import { UserProductWithCompetencyProfileBasicModel } from "./user-product-with-competency-profile-basic.model";

export class LearningPlanProductModel {
    userProductId: number;
    productName: string;
    competencyProfileName: string;
    department: string;
    facility: string;
    startDate: Date;
    programStatus: string;
    competenciesCount: number;
    isTranscript: boolean;
    isActive: boolean;
    productExhibitId: number;
    priorProducts: UserProductWithCompetencyProfileBasicModel[];
}