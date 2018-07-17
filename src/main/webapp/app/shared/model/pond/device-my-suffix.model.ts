export const enum DeviceType {
    PUMP = 'PUMP',
    FILTER = 'FILTER',
    UVLAMP = 'UVLAMP',
    UVCLARIFIER = 'UVCLARIFIER',
    AIRPUMP = 'AIRPUMP',
    OTHER = 'OTHER'
}

export interface IDeviceMySuffix {
    id?: number;
    deviceName?: string;
    deviceType?: DeviceType;
    description?: string;
    timestamp?: number;
}

export class DeviceMySuffix implements IDeviceMySuffix {
    constructor(
        public id?: number,
        public deviceName?: string,
        public deviceType?: DeviceType,
        public description?: string,
        public timestamp?: number
    ) {}
}
