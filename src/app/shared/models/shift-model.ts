export class ShiftModel {
    public id: number;
    public startHour: number;
    public startMinute: number;
    public endHour: number;
    public endMinute: number;

    constructor() {
        this.id = 0;
        this.startHour = 0;
        this.startMinute = 0;
        this.endHour = 0;
        this.endMinute = 0;
    }
}