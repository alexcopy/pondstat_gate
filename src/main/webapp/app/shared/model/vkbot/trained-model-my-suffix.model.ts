export interface ITrainedModelMySuffix {
    id?: number;
    modelName?: string;
    posmatrix?: string;
    negmatrix?: string;
    neutmatrix?: string;
    modeltype?: number;
}

export class TrainedModelMySuffix implements ITrainedModelMySuffix {
    constructor(
        public id?: number,
        public modelName?: string,
        public posmatrix?: string,
        public negmatrix?: string,
        public neutmatrix?: string,
        public modeltype?: number
    ) {}
}
