import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    WaterChangeMySuffixComponent,
    WaterChangeMySuffixDetailComponent,
    WaterChangeMySuffixUpdateComponent,
    WaterChangeMySuffixDeletePopupComponent,
    WaterChangeMySuffixDeleteDialogComponent,
    waterChangeRoute,
    waterChangePopupRoute
} from './';

const ENTITY_STATES = [...waterChangeRoute, ...waterChangePopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WaterChangeMySuffixComponent,
        WaterChangeMySuffixDetailComponent,
        WaterChangeMySuffixUpdateComponent,
        WaterChangeMySuffixDeleteDialogComponent,
        WaterChangeMySuffixDeletePopupComponent
    ],
    entryComponents: [
        WaterChangeMySuffixComponent,
        WaterChangeMySuffixUpdateComponent,
        WaterChangeMySuffixDeleteDialogComponent,
        WaterChangeMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateWaterChangeMySuffixModule {}
