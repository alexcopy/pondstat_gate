import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    ResultsMatricesMySuffixService,
    ResultsMatricesMySuffixPopupService,
    ResultsMatricesMySuffixComponent,
    ResultsMatricesMySuffixDetailComponent,
    ResultsMatricesMySuffixDialogComponent,
    ResultsMatricesMySuffixPopupComponent,
    ResultsMatricesMySuffixDeletePopupComponent,
    ResultsMatricesMySuffixDeleteDialogComponent,
    resultsMatricesRoute,
    resultsMatricesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...resultsMatricesRoute,
    ...resultsMatricesPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ResultsMatricesMySuffixComponent,
        ResultsMatricesMySuffixDetailComponent,
        ResultsMatricesMySuffixDialogComponent,
        ResultsMatricesMySuffixDeleteDialogComponent,
        ResultsMatricesMySuffixPopupComponent,
        ResultsMatricesMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ResultsMatricesMySuffixComponent,
        ResultsMatricesMySuffixDialogComponent,
        ResultsMatricesMySuffixPopupComponent,
        ResultsMatricesMySuffixDeleteDialogComponent,
        ResultsMatricesMySuffixDeletePopupComponent,
    ],
    providers: [
        ResultsMatricesMySuffixService,
        ResultsMatricesMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateResultsMatricesMySuffixModule {}
