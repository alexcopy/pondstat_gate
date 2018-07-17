import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    ChemicalAnalysisMySuffixComponent,
    ChemicalAnalysisMySuffixDetailComponent,
    ChemicalAnalysisMySuffixUpdateComponent,
    ChemicalAnalysisMySuffixDeletePopupComponent,
    ChemicalAnalysisMySuffixDeleteDialogComponent,
    chemicalAnalysisRoute,
    chemicalAnalysisPopupRoute
} from './';

const ENTITY_STATES = [...chemicalAnalysisRoute, ...chemicalAnalysisPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ChemicalAnalysisMySuffixComponent,
        ChemicalAnalysisMySuffixDetailComponent,
        ChemicalAnalysisMySuffixUpdateComponent,
        ChemicalAnalysisMySuffixDeleteDialogComponent,
        ChemicalAnalysisMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ChemicalAnalysisMySuffixComponent,
        ChemicalAnalysisMySuffixUpdateComponent,
        ChemicalAnalysisMySuffixDeleteDialogComponent,
        ChemicalAnalysisMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateChemicalAnalysisMySuffixModule {}
