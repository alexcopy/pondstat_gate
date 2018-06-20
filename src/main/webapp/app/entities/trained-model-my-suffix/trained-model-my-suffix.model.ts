import { BaseEntity } from './../../shared';

export class TrainedModelMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public modelName?: string,
        public posmatrix?: string,
        public negmatrix?: string,
        public neutmatrix?: string,
        public modeltype?: number,
    ) {
    }
}
