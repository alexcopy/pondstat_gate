import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    ClarifaisMySuffixComponent,
    ClarifaisMySuffixDetailComponent,
    ClarifaisMySuffixUpdateComponent,
    ClarifaisMySuffixDeletePopupComponent,
    ClarifaisMySuffixDeleteDialogComponent,
    clarifaisRoute,
    clarifaisPopupRoute
} from './';

const ENTITY_STATES = [...clarifaisRoute, ...clarifaisPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClarifaisMySuffixComponent,
        ClarifaisMySuffixDetailComponent,
        ClarifaisMySuffixUpdateComponent,
        ClarifaisMySuffixDeleteDialogComponent,
        ClarifaisMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ClarifaisMySuffixComponent,
        ClarifaisMySuffixUpdateComponent,
        ClarifaisMySuffixDeleteDialogComponent,
        ClarifaisMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateClarifaisMySuffixModule {}
