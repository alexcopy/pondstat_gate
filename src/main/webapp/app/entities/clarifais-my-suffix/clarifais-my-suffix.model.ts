import { BaseEntity } from './../../shared';

export class ClarifaisMySuffix implements BaseEntity {
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
        public count?: number,
    ) {
    }
}
