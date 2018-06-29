import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    ClarifaisMySuffixService,
    ClarifaisMySuffixPopupService,
    ClarifaisMySuffixComponent,
    ClarifaisMySuffixDetailComponent,
    ClarifaisMySuffixDialogComponent,
    ClarifaisMySuffixPopupComponent,
    ClarifaisMySuffixDeletePopupComponent,
    ClarifaisMySuffixDeleteDialogComponent,
    clarifaisRoute,
    clarifaisPopupRoute,
    ClarifaisMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...clarifaisRoute,
    ...clarifaisPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClarifaisMySuffixComponent,
        ClarifaisMySuffixDetailComponent,
        ClarifaisMySuffixDialogComponent,
        ClarifaisMySuffixDeleteDialogComponent,
        ClarifaisMySuffixPopupComponent,
        ClarifaisMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ClarifaisMySuffixComponent,
        ClarifaisMySuffixDialogComponent,
        ClarifaisMySuffixPopupComponent,
        ClarifaisMySuffixDeleteDialogComponent,
        ClarifaisMySuffixDeletePopupComponent,
    ],
    providers: [
        ClarifaisMySuffixService,
        ClarifaisMySuffixPopupService,
        ClarifaisMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateClarifaisMySuffixModule {}
