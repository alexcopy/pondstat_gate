import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    OtherWorksMySuffixComponent,
    OtherWorksMySuffixDetailComponent,
    OtherWorksMySuffixUpdateComponent,
    OtherWorksMySuffixDeletePopupComponent,
    OtherWorksMySuffixDeleteDialogComponent,
    otherWorksRoute,
    otherWorksPopupRoute
} from './';

const ENTITY_STATES = [...otherWorksRoute, ...otherWorksPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OtherWorksMySuffixComponent,
        OtherWorksMySuffixDetailComponent,
        OtherWorksMySuffixUpdateComponent,
        OtherWorksMySuffixDeleteDialogComponent,
        OtherWorksMySuffixDeletePopupComponent
    ],
    entryComponents: [
        OtherWorksMySuffixComponent,
        OtherWorksMySuffixUpdateComponent,
        OtherWorksMySuffixDeleteDialogComponent,
        OtherWorksMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateOtherWorksMySuffixModule {}
