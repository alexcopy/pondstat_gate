import { Moment } from 'moment';

export interface IFilterPumpCleaningMySuffix {
    id?: number;
    cleaningDate?: Moment;
    description?: string;
    tempVal?: number;
    timestamp?: number;
}

export class FilterPumpCleaningMySuffix implements IFilterPumpCleaningMySuffix {
    constructor(
        public id?: number,
        public cleaningDate?: Moment,
        public description?: string,
        public tempVal?: number,
        public timestamp?: number
    ) {}
}
