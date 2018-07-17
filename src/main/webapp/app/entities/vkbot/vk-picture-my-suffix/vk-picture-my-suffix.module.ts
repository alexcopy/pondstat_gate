import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    VkPictureMySuffixComponent,
    VkPictureMySuffixDetailComponent,
    VkPictureMySuffixUpdateComponent,
    VkPictureMySuffixDeletePopupComponent,
    VkPictureMySuffixDeleteDialogComponent,
    vkPictureRoute,
    vkPicturePopupRoute
} from './';

const ENTITY_STATES = [...vkPictureRoute, ...vkPicturePopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VkPictureMySuffixComponent,
        VkPictureMySuffixDetailComponent,
        VkPictureMySuffixUpdateComponent,
        VkPictureMySuffixDeleteDialogComponent,
        VkPictureMySuffixDeletePopupComponent
    ],
    entryComponents: [
        VkPictureMySuffixComponent,
        VkPictureMySuffixUpdateComponent,
        VkPictureMySuffixDeleteDialogComponent,
        VkPictureMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateVkPictureMySuffixModule {}
