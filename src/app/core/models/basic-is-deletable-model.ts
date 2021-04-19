import { IsDeletable } from '../interfaces/is-deletable';
import { BasicModel } from './basic-model';



export class BasicIsDeletableModel extends BasicModel implements IsDeletable {
    isDeletable: boolean;

    constructor(id: number, name: string, isDeletable: boolean = false) {
       super(id, name)

       this.isDeletable = isDeletable;
    }
}