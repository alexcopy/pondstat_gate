import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VkGroupMySuffixComponent } from './vk-group-my-suffix.component';
import { VkGroupMySuffixDetailComponent } from './vk-group-my-suffix-detail.component';
import { VkGroupMySuffixPopupComponent } from './vk-group-my-suffix-dialog.component';
import { VkGroupMySuffixDeletePopupComponent } from './vk-group-my-suffix-delete-dialog.component';

export const vkGroupRoute: Routes = [
    {
        path: 'vk-group-my-suffix',
        component: VkGroupMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vk-group-my-suffix/:id',
        component: VkGroupMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vkGroupPopupRoute: Routes = [
    {
        path: 'vk-group-my-suffix-new',
        component: VkGroupMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vk-group-my-suffix/:id/edit',
        component: VkGroupMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vk-group-my-suffix/:id/delete',
        component: VkGroupMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
