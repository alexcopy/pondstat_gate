import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    VkGroupMySuffixComponent,
    VkGroupMySuffixDetailComponent,
    VkGroupMySuffixUpdateComponent,
    VkGroupMySuffixDeletePopupComponent,
    VkGroupMySuffixDeleteDialogComponent,
    vkGroupRoute,
    vkGroupPopupRoute
} from './';

const ENTITY_STATES = [...vkGroupRoute, ...vkGroupPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VkGroupMySuffixComponent,
        VkGroupMySuffixDetailComponent,
        VkGroupMySuffixUpdateComponent,
        VkGroupMySuffixDeleteDialogComponent,
        VkGroupMySuffixDeletePopupComponent
    ],
    entryComponents: [
        VkGroupMySuffixComponent,
        VkGroupMySuffixUpdateComponent,
        VkGroupMySuffixDeleteDialogComponent,
        VkGroupMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateVkGroupMySuffixModule {}
