import { BasicModel } from './basic-model';
import { IsDeletable } from '../interfaces';

export class BasicIsDeletableModel extends BasicModel implements IsDeletable {
    isDeletable: boolean;

    constructor(id: number, name: string, isDeletable: boolean = false) {
       super(id, name)

       this.isDeletable = isDeletable;
    }
}