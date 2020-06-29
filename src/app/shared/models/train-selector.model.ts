export class TrainSelectorModel{
    constructor(
        public id: number = 0,
        public abbreviation: string = '',
        public name: string = '',
        public selected: boolean = false,
        public disabled: boolean = false
    ) {}
}