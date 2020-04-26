export class BasicModel {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class BasicActiveModel extends BasicModel{
    isActive: boolean

    constructor(id: number, name: string, isActive: boolean = false) {
       super(id, name)

       this.isActive = isActive;
    }
}
