export interface IResultsMatricesMySuffix {
    id?: number;
    resid?: number;
    result?: number;
    type?: number;
    matrix?: number;
}

export class ResultsMatricesMySuffix implements IResultsMatricesMySuffix {
    constructor(public id?: number, public resid?: number, public result?: number, public type?: number, public matrix?: number) {}
}
