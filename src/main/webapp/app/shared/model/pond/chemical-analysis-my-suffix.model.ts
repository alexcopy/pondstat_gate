import { Moment } from 'moment';

export interface IChemicalAnalysisMySuffix {
    id?: number;
    date?: Moment;
    nO2?: string;
    nO3?: string;
    nH4?: string;
    ph?: string;
    tempVal?: number;
    timestamp?: number;
}

export class ChemicalAnalysisMySuffix implements IChemicalAnalysisMySuffix {
    constructor(
        public id?: number,
        public date?: Moment,
        public nO2?: string,
        public nO3?: string,
        public nH4?: string,
        public ph?: string,
        public tempVal?: number,
        public timestamp?: number
    ) {}
}
