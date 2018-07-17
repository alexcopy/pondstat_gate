import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    FilterPumpCleaningMySuffixComponent,
    FilterPumpCleaningMySuffixDetailComponent,
    FilterPumpCleaningMySuffixUpdateComponent,
    FilterPumpCleaningMySuffixDeletePopupComponent,
    FilterPumpCleaningMySuffixDeleteDialogComponent,
    filterPumpCleaningRoute,
    filterPumpCleaningPopupRoute
} from './';

const ENTITY_STATES = [...filterPumpCleaningRoute, ...filterPumpCleaningPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FilterPumpCleaningMySuffixComponent,
        FilterPumpCleaningMySuffixDetailComponent,
        FilterPumpCleaningMySuffixUpdateComponent,
        FilterPumpCleaningMySuffixDeleteDialogComponent,
        FilterPumpCleaningMySuffixDeletePopupComponent
    ],
    entryComponents: [
        FilterPumpCleaningMySuffixComponent,
        FilterPumpCleaningMySuffixUpdateComponent,
        FilterPumpCleaningMySuffixDeleteDialogComponent,
        FilterPumpCleaningMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateFilterPumpCleaningMySuffixModule {}
