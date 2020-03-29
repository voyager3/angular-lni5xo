export class DialogResultModel {
    isConfirmed: boolean;
    data: any;

    constructor(isConfirmed: boolean, data?: any) {
        this.isConfirmed = isConfirmed;
        this.data = data;
    }
}