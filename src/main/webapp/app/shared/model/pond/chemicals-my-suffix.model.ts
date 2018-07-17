import { Moment } from 'moment';

export interface IChemicalsMySuffix {
    id?: number;
    date?: Moment;
    qty?: number;
    reason?: string;
    tempVal?: number;
    timestamp?: number;
}

export class ChemicalsMySuffix implements IChemicalsMySuffix {
    constructor(
        public id?: number,
        public date?: Moment,
        public qty?: number,
        public reason?: string,
        public tempVal?: number,
        public timestamp?: number
    ) {}
}
