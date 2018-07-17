export interface IClarifaisMySuffix {
    id?: number;
    name?: string;
    email?: string;
    emailpassword?: string;
    apikey?: string;
    modelname?: string;
    country?: string;
    billday?: string;
    totalusage?: number;
    count?: number;
}

export class ClarifaisMySuffix implements IClarifaisMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public emailpassword?: string,
        public apikey?: string,
        public modelname?: string,
        public country?: string,
        public billday?: string,
        public totalusage?: number,
        public count?: number
    ) {}
}
