export class GrouppedButtonModel{
    constructor(     
    public selected: boolean,
    public valueId: number = 0,
    public icon: string = '',
    public text: string = '',    
    public disabled: boolean = false,
    public toggleable: boolean = true
    ) {}
}