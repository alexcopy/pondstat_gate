import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { WaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';
import { WaterChangeMySuffixService } from './water-change-my-suffix.service';
import { WaterChangeMySuffixComponent } from './water-change-my-suffix.component';
import { WaterChangeMySuffixDetailComponent } from './water-change-my-suffix-detail.component';
import { WaterChangeMySuffixUpdateComponent } from './water-change-my-suffix-update.component';
import { WaterChangeMySuffixDeletePopupComponent } from './water-change-my-suffix-delete-dialog.component';
import { IWaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class WaterChangeMySuffixResolve implements Resolve<IWaterChangeMySuffix> {
    constructor(private service: WaterChangeMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((waterChange: HttpResponse<WaterChangeMySuffix>) => waterChange.body));
        }
        return of(new WaterChangeMySuffix());
    }
}

export const waterChangeRoute: Routes = [
    {
        path: 'water-change-my-suffix',
        component: WaterChangeMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondWaterChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'water-change-my-suffix/:id/view',
        component: WaterChangeMySuffixDetailComponent,
        resolve: {
            waterChange: WaterChangeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondWaterChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'water-change-my-suffix/new',
        component: WaterChangeMySuffixUpdateComponent,
        resolve: {
            waterChange: WaterChangeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondWaterChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'water-change-my-suffix/:id/edit',
        component: WaterChangeMySuffixUpdateComponent,
        resolve: {
            waterChange: WaterChangeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondWaterChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const waterChangePopupRoute: Routes = [
    {
        path: 'water-change-my-suffix/:id/delete',
        component: WaterChangeMySuffixDeletePopupComponent,
        resolve: {
            waterChange: WaterChangeMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondWaterChange.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
