import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    DeviceMySuffixComponent,
    DeviceMySuffixDetailComponent,
    DeviceMySuffixUpdateComponent,
    DeviceMySuffixDeletePopupComponent,
    DeviceMySuffixDeleteDialogComponent,
    deviceRoute,
    devicePopupRoute
} from './';

const ENTITY_STATES = [...deviceRoute, ...devicePopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeviceMySuffixComponent,
        DeviceMySuffixDetailComponent,
        DeviceMySuffixUpdateComponent,
        DeviceMySuffixDeleteDialogComponent,
        DeviceMySuffixDeletePopupComponent
    ],
    entryComponents: [
        DeviceMySuffixComponent,
        DeviceMySuffixUpdateComponent,
        DeviceMySuffixDeleteDialogComponent,
        DeviceMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateDeviceMySuffixModule {}
