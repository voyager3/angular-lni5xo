import { BasicModel } from "../../core/models";

export class CriteriaCategoryViewModel extends BasicModel{
    constructor(
        public id: number,
        public name: string,
        public criteriaCategories: CriteriaViewModel[]){
        super(id, name);
    }
}

export class CriteriaViewModel {
    constructor(
        public competencyQuestionBankName: string,
        public responseValue?: number,
        public nameADO?: string
        ){}
}