import { BaseEntity } from './../../shared';

export class VkGroupMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public groupid?: number,
        public name?: string,
        public screenname?: string,
        public type?: string,
        public isclosed?: number,
        public proc?: number,
        public procusers?: number,
        public usersqty?: number,
        public usersadded?: number,
        public ignore?: number,
        public stateProvince?: string,
    ) {
    }
}
