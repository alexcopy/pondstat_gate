import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    TankMySuffixComponent,
    TankMySuffixDetailComponent,
    TankMySuffixUpdateComponent,
    TankMySuffixDeletePopupComponent,
    TankMySuffixDeleteDialogComponent,
    tankRoute,
    tankPopupRoute
} from './';

const ENTITY_STATES = [...tankRoute, ...tankPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TankMySuffixComponent,
        TankMySuffixDetailComponent,
        TankMySuffixUpdateComponent,
        TankMySuffixDeleteDialogComponent,
        TankMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TankMySuffixComponent,
        TankMySuffixUpdateComponent,
        TankMySuffixDeleteDialogComponent,
        TankMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateTankMySuffixModule {}
