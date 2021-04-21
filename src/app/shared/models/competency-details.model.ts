export class CompetencyDetailsModel {
    constructor(
        public title: string,
        public competencyName: string,
        public outcomeStatement: string,
        public color: string,
        public abbreviation: string,
        public categoryName: string, 
        public competencyVersion: string,
        public competencyNumber: string
    ) { }
}