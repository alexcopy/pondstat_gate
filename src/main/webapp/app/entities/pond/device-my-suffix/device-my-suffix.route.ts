import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeviceMySuffix } from 'app/shared/model/pond/device-my-suffix.model';
import { DeviceMySuffixService } from './device-my-suffix.service';
import { DeviceMySuffixComponent } from './device-my-suffix.component';
import { DeviceMySuffixDetailComponent } from './device-my-suffix-detail.component';
import { DeviceMySuffixUpdateComponent } from './device-my-suffix-update.component';
import { DeviceMySuffixDeletePopupComponent } from './device-my-suffix-delete-dialog.component';
import { IDeviceMySuffix } from 'app/shared/model/pond/device-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DeviceMySuffixResolve implements Resolve<IDeviceMySuffix> {
    constructor(private service: DeviceMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((device: HttpResponse<DeviceMySuffix>) => device.body));
        }
        return of(new DeviceMySuffix());
    }
}

export const deviceRoute: Routes = [
    {
        path: 'device-my-suffix',
        component: DeviceMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'device-my-suffix/:id/view',
        component: DeviceMySuffixDetailComponent,
        resolve: {
            device: DeviceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'device-my-suffix/new',
        component: DeviceMySuffixUpdateComponent,
        resolve: {
            device: DeviceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'device-my-suffix/:id/edit',
        component: DeviceMySuffixUpdateComponent,
        resolve: {
            device: DeviceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondDevice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const devicePopupRoute: Routes = [
    {
        path: 'device-my-suffix/:id/delete',
        component: DeviceMySuffixDeletePopupComponent,
        resolve: {
            device: DeviceMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondDevice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
