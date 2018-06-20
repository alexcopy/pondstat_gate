import { BaseEntity } from './../../shared';

export class ResultsMatricesMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public resid?: number,
        public result?: number,
        public type?: number,
        public matrix?: number,
    ) {
    }
}
