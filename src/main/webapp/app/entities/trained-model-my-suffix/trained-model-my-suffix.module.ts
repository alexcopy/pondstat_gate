import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    TrainedModelMySuffixService,
    TrainedModelMySuffixPopupService,
    TrainedModelMySuffixComponent,
    TrainedModelMySuffixDetailComponent,
    TrainedModelMySuffixDialogComponent,
    TrainedModelMySuffixPopupComponent,
    TrainedModelMySuffixDeletePopupComponent,
    TrainedModelMySuffixDeleteDialogComponent,
    trainedModelRoute,
    trainedModelPopupRoute,
    TrainedModelMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...trainedModelRoute,
    ...trainedModelPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TrainedModelMySuffixComponent,
        TrainedModelMySuffixDetailComponent,
        TrainedModelMySuffixDialogComponent,
        TrainedModelMySuffixDeleteDialogComponent,
        TrainedModelMySuffixPopupComponent,
        TrainedModelMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TrainedModelMySuffixComponent,
        TrainedModelMySuffixDialogComponent,
        TrainedModelMySuffixPopupComponent,
        TrainedModelMySuffixDeleteDialogComponent,
        TrainedModelMySuffixDeletePopupComponent,
    ],
    providers: [
        TrainedModelMySuffixService,
        TrainedModelMySuffixPopupService,
        TrainedModelMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateTrainedModelMySuffixModule {}
