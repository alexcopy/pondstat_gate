import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';
import { VkPictureMySuffixService } from './vk-picture-my-suffix.service';
import { VkPictureMySuffixComponent } from './vk-picture-my-suffix.component';
import { VkPictureMySuffixDetailComponent } from './vk-picture-my-suffix-detail.component';
import { VkPictureMySuffixUpdateComponent } from './vk-picture-my-suffix-update.component';
import { VkPictureMySuffixDeletePopupComponent } from './vk-picture-my-suffix-delete-dialog.component';
import { IVkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class VkPictureMySuffixResolve implements Resolve<IVkPictureMySuffix> {
    constructor(private service: VkPictureMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((vkPicture: HttpResponse<VkPictureMySuffix>) => vkPicture.body));
        }
        return of(new VkPictureMySuffix());
    }
}

export const vkPictureRoute: Routes = [
    {
        path: 'vk-picture-my-suffix',
        component: VkPictureMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkPicture.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vk-picture-my-suffix/:id/view',
        component: VkPictureMySuffixDetailComponent,
        resolve: {
            vkPicture: VkPictureMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkPicture.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vk-picture-my-suffix/new',
        component: VkPictureMySuffixUpdateComponent,
        resolve: {
            vkPicture: VkPictureMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkPicture.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vk-picture-my-suffix/:id/edit',
        component: VkPictureMySuffixUpdateComponent,
        resolve: {
            vkPicture: VkPictureMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkPicture.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vkPicturePopupRoute: Routes = [
    {
        path: 'vk-picture-my-suffix/:id/delete',
        component: VkPictureMySuffixDeletePopupComponent,
        resolve: {
            vkPicture: VkPictureMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotVkPicture.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
