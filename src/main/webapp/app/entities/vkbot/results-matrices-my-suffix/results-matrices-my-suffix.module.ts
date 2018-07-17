import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    ResultsMatricesMySuffixComponent,
    ResultsMatricesMySuffixDetailComponent,
    ResultsMatricesMySuffixUpdateComponent,
    ResultsMatricesMySuffixDeletePopupComponent,
    ResultsMatricesMySuffixDeleteDialogComponent,
    resultsMatricesRoute,
    resultsMatricesPopupRoute
} from './';

const ENTITY_STATES = [...resultsMatricesRoute, ...resultsMatricesPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ResultsMatricesMySuffixComponent,
        ResultsMatricesMySuffixDetailComponent,
        ResultsMatricesMySuffixUpdateComponent,
        ResultsMatricesMySuffixDeleteDialogComponent,
        ResultsMatricesMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ResultsMatricesMySuffixComponent,
        ResultsMatricesMySuffixUpdateComponent,
        ResultsMatricesMySuffixDeleteDialogComponent,
        ResultsMatricesMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateResultsMatricesMySuffixModule {}
