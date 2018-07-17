import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LiveStockMySuffix } from 'app/shared/model/pond/live-stock-my-suffix.model';
import { LiveStockMySuffixService } from './live-stock-my-suffix.service';
import { LiveStockMySuffixComponent } from './live-stock-my-suffix.component';
import { LiveStockMySuffixDetailComponent } from './live-stock-my-suffix-detail.component';
import { LiveStockMySuffixUpdateComponent } from './live-stock-my-suffix-update.component';
import { LiveStockMySuffixDeletePopupComponent } from './live-stock-my-suffix-delete-dialog.component';
import { ILiveStockMySuffix } from 'app/shared/model/pond/live-stock-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class LiveStockMySuffixResolve implements Resolve<ILiveStockMySuffix> {
    constructor(private service: LiveStockMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((liveStock: HttpResponse<LiveStockMySuffix>) => liveStock.body));
        }
        return of(new LiveStockMySuffix());
    }
}

export const liveStockRoute: Routes = [
    {
        path: 'live-stock-my-suffix',
        component: LiveStockMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gateApp.pondLiveStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'live-stock-my-suffix/:id/view',
        component: LiveStockMySuffixDetailComponent,
        resolve: {
            liveStock: LiveStockMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondLiveStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'live-stock-my-suffix/new',
        component: LiveStockMySuffixUpdateComponent,
        resolve: {
            liveStock: LiveStockMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondLiveStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'live-stock-my-suffix/:id/edit',
        component: LiveStockMySuffixUpdateComponent,
        resolve: {
            liveStock: LiveStockMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondLiveStock.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const liveStockPopupRoute: Routes = [
    {
        path: 'live-stock-my-suffix/:id/delete',
        component: LiveStockMySuffixDeletePopupComponent,
        resolve: {
            liveStock: LiveStockMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondLiveStock.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
