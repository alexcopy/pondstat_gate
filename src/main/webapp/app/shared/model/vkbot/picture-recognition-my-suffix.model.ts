export interface IPictureRecognitionMySuffix {
    id?: number;
    pictid?: number;
    modelid?: number;
    simpres?: number;
    medres?: number;
    ignore?: number;
    isselected?: number;
    ismanual?: number;
}

export class PictureRecognitionMySuffix implements IPictureRecognitionMySuffix {
    constructor(
        public id?: number,
        public pictid?: number,
        public modelid?: number,
        public simpres?: number,
        public medres?: number,
        public ignore?: number,
        public isselected?: number,
        public ismanual?: number
    ) {}
}
