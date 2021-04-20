export class GridMenuActionModel{
    public text: string;
    public callback?: Function;
    public items?: GridMenuActionModel[];
    public isHidden: boolean = false;
    public param?: number;
    public disabled: boolean = false;

    constructor(items: GridMenuActionModel[], text: string, isHidden?: boolean)
    constructor(callback: Function, text: string, isHidden?: boolean, disabled?: boolean, param?: number)
    constructor(itemsOrCallback: any, text: string, isHidden: boolean = false, disabled: boolean = false, param?: number){
        this.text = text;
        this.callback = typeof itemsOrCallback === "function" ? itemsOrCallback : null;
        this.isHidden = isHidden;
        this.items = typeof itemsOrCallback === "object" ? itemsOrCallback : null;;
        this.param = param;
        this.disabled = disabled;
    }
}