import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    PictureRecognitionMySuffixComponent,
    PictureRecognitionMySuffixDetailComponent,
    PictureRecognitionMySuffixUpdateComponent,
    PictureRecognitionMySuffixDeletePopupComponent,
    PictureRecognitionMySuffixDeleteDialogComponent,
    pictureRecognitionRoute,
    pictureRecognitionPopupRoute
} from './';

const ENTITY_STATES = [...pictureRecognitionRoute, ...pictureRecognitionPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PictureRecognitionMySuffixComponent,
        PictureRecognitionMySuffixDetailComponent,
        PictureRecognitionMySuffixUpdateComponent,
        PictureRecognitionMySuffixDeleteDialogComponent,
        PictureRecognitionMySuffixDeletePopupComponent
    ],
    entryComponents: [
        PictureRecognitionMySuffixComponent,
        PictureRecognitionMySuffixUpdateComponent,
        PictureRecognitionMySuffixDeleteDialogComponent,
        PictureRecognitionMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatePictureRecognitionMySuffixModule {}
