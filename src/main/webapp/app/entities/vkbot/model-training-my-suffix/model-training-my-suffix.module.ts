import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    ModelTrainingMySuffixComponent,
    ModelTrainingMySuffixDetailComponent,
    ModelTrainingMySuffixUpdateComponent,
    ModelTrainingMySuffixDeletePopupComponent,
    ModelTrainingMySuffixDeleteDialogComponent,
    modelTrainingRoute,
    modelTrainingPopupRoute
} from './';

const ENTITY_STATES = [...modelTrainingRoute, ...modelTrainingPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ModelTrainingMySuffixComponent,
        ModelTrainingMySuffixDetailComponent,
        ModelTrainingMySuffixUpdateComponent,
        ModelTrainingMySuffixDeleteDialogComponent,
        ModelTrainingMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ModelTrainingMySuffixComponent,
        ModelTrainingMySuffixUpdateComponent,
        ModelTrainingMySuffixDeleteDialogComponent,
        ModelTrainingMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateModelTrainingMySuffixModule {}
