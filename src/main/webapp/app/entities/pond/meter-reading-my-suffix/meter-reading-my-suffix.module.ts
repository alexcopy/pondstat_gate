import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    MeterReadingMySuffixComponent,
    MeterReadingMySuffixDetailComponent,
    MeterReadingMySuffixUpdateComponent,
    MeterReadingMySuffixDeletePopupComponent,
    MeterReadingMySuffixDeleteDialogComponent,
    meterReadingRoute,
    meterReadingPopupRoute
} from './';

const ENTITY_STATES = [...meterReadingRoute, ...meterReadingPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MeterReadingMySuffixComponent,
        MeterReadingMySuffixDetailComponent,
        MeterReadingMySuffixUpdateComponent,
        MeterReadingMySuffixDeleteDialogComponent,
        MeterReadingMySuffixDeletePopupComponent
    ],
    entryComponents: [
        MeterReadingMySuffixComponent,
        MeterReadingMySuffixUpdateComponent,
        MeterReadingMySuffixDeleteDialogComponent,
        MeterReadingMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateMeterReadingMySuffixModule {}
