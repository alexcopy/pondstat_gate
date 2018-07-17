export interface IClarifaiProcessMySuffix {
    id?: number;
    pictid?: number;
    pictkey?: number;
    url?: string;
    firstfive?: string;
    ignore?: number;
    proc?: number;
    model?: string;
    rawdata?: string;
}

export class ClarifaiProcessMySuffix implements IClarifaiProcessMySuffix {
    constructor(
        public id?: number,
        public pictid?: number,
        public pictkey?: number,
        public url?: string,
        public firstfive?: string,
        public ignore?: number,
        public proc?: number,
        public model?: string,
        public rawdata?: string
    ) {}
}
