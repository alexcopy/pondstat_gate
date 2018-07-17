import { Moment } from 'moment';

export interface IOtherWorksMySuffix {
    id?: number;
    date?: Moment;
    reason?: string;
    qty?: number;
    descripton?: string;
    tempVal?: number;
    timestamp?: number;
}

export class OtherWorksMySuffix implements IOtherWorksMySuffix {
    constructor(
        public id?: number,
        public date?: Moment,
        public reason?: string,
        public qty?: number,
        public descripton?: string,
        public tempVal?: number,
        public timestamp?: number
    ) {}
}
