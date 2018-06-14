import { BaseEntity } from './../../shared';

export class ChemicalAnalysisMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public nO2?: string,
        public nO3?: string,
        public nH4?: string,
        public ph?: string,
        public tempVal?: number,
        public timestamp?: number,
    ) {
    }
}
