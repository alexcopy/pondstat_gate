export interface IModelTrainingMySuffix {
    id?: number;
    pictid?: number;
    modelid?: number;
    procid?: number;
    result?: number;
}

export class ModelTrainingMySuffix implements IModelTrainingMySuffix {
    constructor(public id?: number, public pictid?: number, public modelid?: number, public procid?: number, public result?: number) {}
}
