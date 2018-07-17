export interface ISelectedKeyWordsMySuffix {
    id?: number;
    modelid?: number;
    posmatrix?: string;
    neutmatrix?: string;
    negmatrix?: string;
}

export class SelectedKeyWordsMySuffix implements ISelectedKeyWordsMySuffix {
    constructor(
        public id?: number,
        public modelid?: number,
        public posmatrix?: string,
        public neutmatrix?: string,
        public negmatrix?: string
    ) {}
}
