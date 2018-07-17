export interface IVkGroupMySuffix {
    id?: number;
    groupid?: number;
    name?: string;
    screenname?: string;
    type?: string;
    isclosed?: number;
    proc?: number;
    procusers?: number;
    usersqty?: number;
    usersadded?: number;
    ignore?: number;
    stateProvince?: string;
}

export class VkGroupMySuffix implements IVkGroupMySuffix {
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
        public stateProvince?: string
    ) {}
}
