import { Moment } from 'moment';

export interface IWaterChangeMySuffix {
    id?: number;
    changeDate?: Moment;
    description?: string;
    readingBefore?: number;
    readingAfter?: number;
    tempVal?: number;
    timestamp?: number;
}

export class WaterChangeMySuffix implements IWaterChangeMySuffix {
    constructor(
        public id?: number,
        public changeDate?: Moment,
        public description?: string,
        public readingBefore?: number,
        public readingAfter?: number,
        public tempVal?: number,
        public timestamp?: number
    ) {}
}
