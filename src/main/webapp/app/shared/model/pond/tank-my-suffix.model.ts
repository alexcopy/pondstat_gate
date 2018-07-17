export const enum TankType {
    POND = 'POND',
    AQUARIUM = 'AQUARIUM'
}

export interface ITankMySuffix {
    id?: number;
    tankName?: string;
    tankType?: TankType;
    description?: string;
    timestamp?: number;
}

export class TankMySuffix implements ITankMySuffix {
    constructor(
        public id?: number,
        public tankName?: string,
        public tankType?: TankType,
        public description?: string,
        public timestamp?: number
    ) {}
}
