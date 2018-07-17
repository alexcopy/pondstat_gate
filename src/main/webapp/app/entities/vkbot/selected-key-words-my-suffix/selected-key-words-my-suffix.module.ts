import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    SelectedKeyWordsMySuffixComponent,
    SelectedKeyWordsMySuffixDetailComponent,
    SelectedKeyWordsMySuffixUpdateComponent,
    SelectedKeyWordsMySuffixDeletePopupComponent,
    SelectedKeyWordsMySuffixDeleteDialogComponent,
    selectedKeyWordsRoute,
    selectedKeyWordsPopupRoute
} from './';

const ENTITY_STATES = [...selectedKeyWordsRoute, ...selectedKeyWordsPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SelectedKeyWordsMySuffixComponent,
        SelectedKeyWordsMySuffixDetailComponent,
        SelectedKeyWordsMySuffixUpdateComponent,
        SelectedKeyWordsMySuffixDeleteDialogComponent,
        SelectedKeyWordsMySuffixDeletePopupComponent
    ],
    entryComponents: [
        SelectedKeyWordsMySuffixComponent,
        SelectedKeyWordsMySuffixUpdateComponent,
        SelectedKeyWordsMySuffixDeleteDialogComponent,
        SelectedKeyWordsMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateSelectedKeyWordsMySuffixModule {}
