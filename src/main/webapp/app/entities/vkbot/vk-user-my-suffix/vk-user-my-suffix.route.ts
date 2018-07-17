import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';
import { VkUserMySuffixService } from './vk-user-my-suffix.service';
import { VkUserMySuffixComponent } from './vk-user-my-suffix.component';
import { VkUserMySuffixDetailComponent } from './vk-user-my-suffix-detail.component';
import { VkUserMySuffixUpdateComponent } from './vk-user-my-suffix-update.component';
import { VkUserMySuffixDeletePopupComponent } from './vk-user-my-suffix-delete-dialog.component';
import { IVkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class VkUserMySuffixResolve implements Resolve<IVkUserMySuffix> {
    constructor(private service: VkUserMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((vkUser: HttpResponse<VkUserMySuffix>) => vkUser.body));
        }
        return of(new VkUserMySuffix());
    }
}

export const vkUserRoute: Routes = [
    {
        path: 'vk-user-my-suffix',
        component: VkUserMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vk-user-my-suffix/:id/view',
        component: VkUserMySuffixDetailComponent,
        resolve: {
            vkUser: VkUserMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vk-user-my-suffix/new',
        component: VkUserMySuffixUpdateComponent,
        resolve: {
            vkUser: VkUserMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vk-user-my-suffix/:id/edit',
        component: VkUserMySuffixUpdateComponent,
        resolve: {
            vkUser: VkUserMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkUser.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vkUserPopupRoute: Routes = [
    {
        path: 'vk-user-my-suffix/:id/delete',
        component: VkUserMySuffixDeletePopupComponent,
        resolve: {
            vkUser: VkUserMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkUser.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
