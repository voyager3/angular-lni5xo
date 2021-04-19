import { BasicIsDeletableModel } from './basic-is-deleteable-model';

export class BasicAbbreviationModel extends BasicIsDeletableModel {
    abbreviation: string;

    constructor(id: number, name: string, abbreviation: string, isDeletable: boolean = false) {
       super(id, name, isDeletable);

       this.abbreviation = abbreviation;
    }
}