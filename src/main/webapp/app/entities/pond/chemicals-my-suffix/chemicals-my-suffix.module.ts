import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    ChemicalsMySuffixComponent,
    ChemicalsMySuffixDetailComponent,
    ChemicalsMySuffixUpdateComponent,
    ChemicalsMySuffixDeletePopupComponent,
    ChemicalsMySuffixDeleteDialogComponent,
    chemicalsRoute,
    chemicalsPopupRoute
} from './';

const ENTITY_STATES = [...chemicalsRoute, ...chemicalsPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ChemicalsMySuffixComponent,
        ChemicalsMySuffixDetailComponent,
        ChemicalsMySuffixUpdateComponent,
        ChemicalsMySuffixDeleteDialogComponent,
        ChemicalsMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ChemicalsMySuffixComponent,
        ChemicalsMySuffixUpdateComponent,
        ChemicalsMySuffixDeleteDialogComponent,
        ChemicalsMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateChemicalsMySuffixModule {}
