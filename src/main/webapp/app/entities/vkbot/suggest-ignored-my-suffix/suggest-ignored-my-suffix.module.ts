import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    SuggestIgnoredMySuffixComponent,
    SuggestIgnoredMySuffixDetailComponent,
    SuggestIgnoredMySuffixUpdateComponent,
    SuggestIgnoredMySuffixDeletePopupComponent,
    SuggestIgnoredMySuffixDeleteDialogComponent,
    suggestIgnoredRoute,
    suggestIgnoredPopupRoute
} from './';

const ENTITY_STATES = [...suggestIgnoredRoute, ...suggestIgnoredPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SuggestIgnoredMySuffixComponent,
        SuggestIgnoredMySuffixDetailComponent,
        SuggestIgnoredMySuffixUpdateComponent,
        SuggestIgnoredMySuffixDeleteDialogComponent,
        SuggestIgnoredMySuffixDeletePopupComponent
    ],
    entryComponents: [
        SuggestIgnoredMySuffixComponent,
        SuggestIgnoredMySuffixUpdateComponent,
        SuggestIgnoredMySuffixDeleteDialogComponent,
        SuggestIgnoredMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateSuggestIgnoredMySuffixModule {}
