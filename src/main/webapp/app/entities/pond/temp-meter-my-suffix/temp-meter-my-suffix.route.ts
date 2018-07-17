import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TempMeterMySuffix } from 'app/shared/model/pond/temp-meter-my-suffix.model';
import { TempMeterMySuffixService } from './temp-meter-my-suffix.service';
import { TempMeterMySuffixComponent } from './temp-meter-my-suffix.component';
import { TempMeterMySuffixDetailComponent } from './temp-meter-my-suffix-detail.component';
import { TempMeterMySuffixUpdateComponent } from './temp-meter-my-suffix-update.component';
import { TempMeterMySuffixDeletePopupComponent } from './temp-meter-my-suffix-delete-dialog.component';
import { ITempMeterMySuffix } from 'app/shared/model/pond/temp-meter-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TempMeterMySuffixResolve implements Resolve<ITempMeterMySuffix> {
    constructor(private service: TempMeterMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tempMeter: HttpResponse<TempMeterMySuffix>) => tempMeter.body));
        }
        return of(new TempMeterMySuffix());
    }
}

export const tempMeterRoute: Routes = [
    {
        path: 'temp-meter-my-suffix',
        component: TempMeterMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTempMeter.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'temp-meter-my-suffix/:id/view',
        component: TempMeterMySuffixDetailComponent,
        resolve: {
            tempMeter: TempMeterMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTempMeter.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'temp-meter-my-suffix/new',
        component: TempMeterMySuffixUpdateComponent,
        resolve: {
            tempMeter: TempMeterMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTempMeter.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'temp-meter-my-suffix/:id/edit',
        component: TempMeterMySuffixUpdateComponent,
        resolve: {
            tempMeter: TempMeterMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTempMeter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tempMeterPopupRoute: Routes = [
    {
        path: 'temp-meter-my-suffix/:id/delete',
        component: TempMeterMySuffixDeletePopupComponent,
        resolve: {
            tempMeter: TempMeterMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTempMeter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
