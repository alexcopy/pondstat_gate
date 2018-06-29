import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from '../../shared';
import {
    VkGroupMySuffixService,
    VkGroupMySuffixPopupService,
    VkGroupMySuffixComponent,
    VkGroupMySuffixDetailComponent,
    VkGroupMySuffixDialogComponent,
    VkGroupMySuffixPopupComponent,
    VkGroupMySuffixDeletePopupComponent,
    VkGroupMySuffixDeleteDialogComponent,
    vkGroupRoute,
    vkGroupPopupRoute,
} from './';

const ENTITY_STATES = [
    ...vkGroupRoute,
    ...vkGroupPopupRoute,
];

@NgModule({
    imports: [
        GateSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VkGroupMySuffixComponent,
        VkGroupMySuffixDetailComponent,
        VkGroupMySuffixDialogComponent,
        VkGroupMySuffixDeleteDialogComponent,
        VkGroupMySuffixPopupComponent,
        VkGroupMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        VkGroupMySuffixComponent,
        VkGroupMySuffixDialogComponent,
        VkGroupMySuffixPopupComponent,
        VkGroupMySuffixDeleteDialogComponent,
        VkGroupMySuffixDeletePopupComponent,
    ],
    providers: [
        VkGroupMySuffixService,
        VkGroupMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateVkGroupMySuffixModule {}
