export interface ISuggestIgnoredMySuffix {
    id?: number;
    pictid?: number;
    modelid?: number;
    resultid?: number;
}

export class SuggestIgnoredMySuffix implements ISuggestIgnoredMySuffix {
    constructor(public id?: number, public pictid?: number, public modelid?: number, public resultid?: number) {}
}
