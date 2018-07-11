import { BaseEntity } from './../../shared';

export class SelectedKeyWordsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public modelid?: number,
        public posmatrix?: string,
        public neutmatrix?: string,
        public negmatrix?: string,
    ) {
    }
}
