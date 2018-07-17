import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeterReadingMySuffix } from 'app/shared/model/pond/meter-reading-my-suffix.model';
import { MeterReadingMySuffixService } from './meter-reading-my-suffix.service';
import { MeterReadingMySuffixComponent } from './meter-reading-my-suffix.component';
import { MeterReadingMySuffixDetailComponent } from './meter-reading-my-suffix-detail.component';
import { MeterReadingMySuffixUpdateComponent } from './meter-reading-my-suffix-update.component';
import { MeterReadingMySuffixDeletePopupComponent } from './meter-reading-my-suffix-delete-dialog.component';
import { IMeterReadingMySuffix } from 'app/shared/model/pond/meter-reading-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class MeterReadingMySuffixResolve implements Resolve<IMeterReadingMySuffix> {
    constructor(private service: MeterReadingMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((meterReading: HttpResponse<MeterReadingMySuffix>) => meterReading.body));
        }
        return of(new MeterReadingMySuffix());
    }
}

export const meterReadingRoute: Routes = [
    {
        path: 'meter-reading-my-suffix',
        component: MeterReadingMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gateApp.pondMeterReading.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-reading-my-suffix/:id/view',
        component: MeterReadingMySuffixDetailComponent,
        resolve: {
            meterReading: MeterReadingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondMeterReading.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-reading-my-suffix/new',
        component: MeterReadingMySuffixUpdateComponent,
        resolve: {
            meterReading: MeterReadingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondMeterReading.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-reading-my-suffix/:id/edit',
        component: MeterReadingMySuffixUpdateComponent,
        resolve: {
            meterReading: MeterReadingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondMeterReading.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const meterReadingPopupRoute: Routes = [
    {
        path: 'meter-reading-my-suffix/:id/delete',
        component: MeterReadingMySuffixDeletePopupComponent,
        resolve: {
            meterReading: MeterReadingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondMeterReading.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
