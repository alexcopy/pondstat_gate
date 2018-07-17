export interface IVkPictureMySuffix {
    id?: number;
    pictId?: string;
    ownerId?: number;
    url?: string;
    proc?: number;
    downloaded?: number;
    deleterank?: number;
    type?: string;
    procid?: number;
    recognized?: number;
    timestamp?: number;
    picdate?: number;
    size?: number;
    text?: string;
    likes?: number;
    ignored?: number;
}

export class VkPictureMySuffix implements IVkPictureMySuffix {
    constructor(
        public id?: number,
        public pictId?: string,
        public ownerId?: number,
        public url?: string,
        public proc?: number,
        public downloaded?: number,
        public deleterank?: number,
        public type?: string,
        public procid?: number,
        public recognized?: number,
        public timestamp?: number,
        public picdate?: number,
        public size?: number,
        public text?: string,
        public likes?: number,
        public ignored?: number
    ) {}
}
