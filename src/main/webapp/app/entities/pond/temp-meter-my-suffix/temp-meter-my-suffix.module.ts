import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    TempMeterMySuffixComponent,
    TempMeterMySuffixDetailComponent,
    TempMeterMySuffixUpdateComponent,
    TempMeterMySuffixDeletePopupComponent,
    TempMeterMySuffixDeleteDialogComponent,
    tempMeterRoute,
    tempMeterPopupRoute
} from './';

const ENTITY_STATES = [...tempMeterRoute, ...tempMeterPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TempMeterMySuffixComponent,
        TempMeterMySuffixDetailComponent,
        TempMeterMySuffixUpdateComponent,
        TempMeterMySuffixDeleteDialogComponent,
        TempMeterMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TempMeterMySuffixComponent,
        TempMeterMySuffixUpdateComponent,
        TempMeterMySuffixDeleteDialogComponent,
        TempMeterMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateTempMeterMySuffixModule {}
