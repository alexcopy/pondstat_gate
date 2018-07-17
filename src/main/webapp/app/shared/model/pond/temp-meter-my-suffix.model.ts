import { Moment } from 'moment';

export interface ITempMeterMySuffix {
    id?: number;
    readingDate?: Moment;
    tempVal?: number;
    timestamp?: number;
}

export class TempMeterMySuffix implements ITempMeterMySuffix {
    constructor(public id?: number, public readingDate?: Moment, public tempVal?: number, public timestamp?: number) {}
}
