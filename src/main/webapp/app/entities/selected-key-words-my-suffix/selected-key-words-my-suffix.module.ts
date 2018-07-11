import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    SelectedKeyWordsMySuffixService,
    SelectedKeyWordsMySuffixPopupService,
    SelectedKeyWordsMySuffixComponent,
    SelectedKeyWordsMySuffixDetailComponent,
    SelectedKeyWordsMySuffixDialogComponent,
    SelectedKeyWordsMySuffixPopupComponent,
    SelectedKeyWordsMySuffixDeletePopupComponent,
    SelectedKeyWordsMySuffixDeleteDialogComponent,
    selectedKeyWordsRoute,
    selectedKeyWordsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...selectedKeyWordsRoute,
    ...selectedKeyWordsPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SelectedKeyWordsMySuffixComponent,
        SelectedKeyWordsMySuffixDetailComponent,
        SelectedKeyWordsMySuffixDialogComponent,
        SelectedKeyWordsMySuffixDeleteDialogComponent,
        SelectedKeyWordsMySuffixPopupComponent,
        SelectedKeyWordsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SelectedKeyWordsMySuffixComponent,
        SelectedKeyWordsMySuffixDialogComponent,
        SelectedKeyWordsMySuffixPopupComponent,
        SelectedKeyWordsMySuffixDeleteDialogComponent,
        SelectedKeyWordsMySuffixDeletePopupComponent,
    ],
    providers: [
        SelectedKeyWordsMySuffixService,
        SelectedKeyWordsMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateSelectedKeyWordsMySuffixModule {}
