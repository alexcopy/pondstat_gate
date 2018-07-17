import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    TrainedModelMySuffixComponent,
    TrainedModelMySuffixDetailComponent,
    TrainedModelMySuffixUpdateComponent,
    TrainedModelMySuffixDeletePopupComponent,
    TrainedModelMySuffixDeleteDialogComponent,
    trainedModelRoute,
    trainedModelPopupRoute
} from './';

const ENTITY_STATES = [...trainedModelRoute, ...trainedModelPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrainedModelMySuffixComponent,
        TrainedModelMySuffixDetailComponent,
        TrainedModelMySuffixUpdateComponent,
        TrainedModelMySuffixDeleteDialogComponent,
        TrainedModelMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TrainedModelMySuffixComponent,
        TrainedModelMySuffixUpdateComponent,
        TrainedModelMySuffixDeleteDialogComponent,
        TrainedModelMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateTrainedModelMySuffixModule {}
