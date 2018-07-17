import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    VkUserMySuffixComponent,
    VkUserMySuffixDetailComponent,
    VkUserMySuffixUpdateComponent,
    VkUserMySuffixDeletePopupComponent,
    VkUserMySuffixDeleteDialogComponent,
    vkUserRoute,
    vkUserPopupRoute
} from './';

const ENTITY_STATES = [...vkUserRoute, ...vkUserPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VkUserMySuffixComponent,
        VkUserMySuffixDetailComponent,
        VkUserMySuffixUpdateComponent,
        VkUserMySuffixDeleteDialogComponent,
        VkUserMySuffixDeletePopupComponent
    ],
    entryComponents: [
        VkUserMySuffixComponent,
        VkUserMySuffixUpdateComponent,
        VkUserMySuffixDeleteDialogComponent,
        VkUserMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateVkUserMySuffixModule {}
