import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VkGroupMySuffix } from 'app/shared/model/vkbot/vk-group-my-suffix.model';
import { VkGroupMySuffixService } from './vk-group-my-suffix.service';
import { VkGroupMySuffixComponent } from './vk-group-my-suffix.component';
import { VkGroupMySuffixDetailComponent } from './vk-group-my-suffix-detail.component';
import { VkGroupMySuffixUpdateComponent } from './vk-group-my-suffix-update.component';
import { VkGroupMySuffixDeletePopupComponent } from './vk-group-my-suffix-delete-dialog.component';
import { IVkGroupMySuffix } from 'app/shared/model/vkbot/vk-group-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class VkGroupMySuffixResolve implements Resolve<IVkGroupMySuffix> {
    constructor(private service: VkGroupMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((vkGroup: HttpResponse<VkGroupMySuffix>) => vkGroup.body));
        }
        return of(new VkGroupMySuffix());
    }
}

export const vkGroupRoute: Routes = [
    {
        path: 'vk-group-my-suffix',
        component: VkGroupMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vk-group-my-suffix/:id/view',
        component: VkGroupMySuffixDetailComponent,
        resolve: {
            vkGroup: VkGroupMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vk-group-my-suffix/new',
        component: VkGroupMySuffixUpdateComponent,
        resolve: {
            vkGroup: VkGroupMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vk-group-my-suffix/:id/edit',
        component: VkGroupMySuffixUpdateComponent,
        resolve: {
            vkGroup: VkGroupMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkGroup.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vkGroupPopupRoute: Routes = [
    {
        path: 'vk-group-my-suffix/:id/delete',
        component: VkGroupMySuffixDeletePopupComponent,
        resolve: {
            vkGroup: VkGroupMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkGroup.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
