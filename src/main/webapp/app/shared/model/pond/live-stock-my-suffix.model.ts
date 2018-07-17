import { Moment } from 'moment';

export const enum StockCase {
    ADDED = 'ADDED',
    REMOVED = 'REMOVED',
    DIED = 'DIED'
}

export interface ILiveStockMySuffix {
    id?: number;
    date?: Moment;
    reason?: StockCase;
    description?: string;
    qty?: number;
    tempVal?: number;
    timestamp?: number;
}

export class LiveStockMySuffix implements ILiveStockMySuffix {
    constructor(
        public id?: number,
        public date?: Moment,
        public reason?: StockCase,
        public description?: string,
        public qty?: number,
        public tempVal?: number,
        public timestamp?: number
    ) {}
}
