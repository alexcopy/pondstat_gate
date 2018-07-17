import { Moment } from 'moment';

export interface IMeterReadingMySuffix {
    id?: number;
    readingDate?: Moment;
    description?: string;
    reading?: number;
    tempVal?: number;
}

export class MeterReadingMySuffix implements IMeterReadingMySuffix {
    constructor(
        public id?: number,
        public readingDate?: Moment,
        public description?: string,
        public reading?: number,
        public tempVal?: number
    ) {}
}
