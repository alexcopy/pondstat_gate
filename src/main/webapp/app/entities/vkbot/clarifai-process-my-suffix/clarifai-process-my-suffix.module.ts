import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    ClarifaiProcessMySuffixComponent,
    ClarifaiProcessMySuffixDetailComponent,
    ClarifaiProcessMySuffixUpdateComponent,
    ClarifaiProcessMySuffixDeletePopupComponent,
    ClarifaiProcessMySuffixDeleteDialogComponent,
    clarifaiProcessRoute,
    clarifaiProcessPopupRoute
} from './';

const ENTITY_STATES = [...clarifaiProcessRoute, ...clarifaiProcessPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClarifaiProcessMySuffixComponent,
        ClarifaiProcessMySuffixDetailComponent,
        ClarifaiProcessMySuffixUpdateComponent,
        ClarifaiProcessMySuffixDeleteDialogComponent,
        ClarifaiProcessMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ClarifaiProcessMySuffixComponent,
        ClarifaiProcessMySuffixUpdateComponent,
        ClarifaiProcessMySuffixDeleteDialogComponent,
        ClarifaiProcessMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateClarifaiProcessMySuffixModule {}
