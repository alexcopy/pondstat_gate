export interface IVkUserMySuffix {
    id?: number;
    userId?: number;
    firstname?: string;
    lastname?: string;
    sex?: string;
    bdate?: string;
    cityid?: number;
    citytitle?: string;
    countryid?: number;
    countrytitle?: string;
    groupscount?: number;
    groupsproc?: number;
    images?: number;
    imagesproc?: number;
    lastseen?: number;
    platform?: string;
    ignore?: number;
    proc?: number;
    photo100?: string;
}

export class VkUserMySuffix implements IVkUserMySuffix {
    constructor(
        public id?: number,
        public userId?: number,
        public firstname?: string,
        public lastname?: string,
        public sex?: string,
        public bdate?: string,
        public cityid?: number,
        public citytitle?: string,
        public countryid?: number,
        public countrytitle?: string,
        public groupscount?: number,
        public groupsproc?: number,
        public images?: number,
        public imagesproc?: number,
        public lastseen?: number,
        public platform?: string,
        public ignore?: number,
        public proc?: number,
        public photo100?: string
    ) {}
}
