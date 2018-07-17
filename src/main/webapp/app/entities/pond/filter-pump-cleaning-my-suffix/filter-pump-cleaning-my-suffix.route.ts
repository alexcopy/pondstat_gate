import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterPumpCleaningMySuffix } from 'app/shared/model/pond/filter-pump-cleaning-my-suffix.model';
import { FilterPumpCleaningMySuffixService } from './filter-pump-cleaning-my-suffix.service';
import { FilterPumpCleaningMySuffixComponent } from './filter-pump-cleaning-my-suffix.component';
import { FilterPumpCleaningMySuffixDetailComponent } from './filter-pump-cleaning-my-suffix-detail.component';
import { FilterPumpCleaningMySuffixUpdateComponent } from './filter-pump-cleaning-my-suffix-update.component';
import { FilterPumpCleaningMySuffixDeletePopupComponent } from './filter-pump-cleaning-my-suffix-delete-dialog.component';
import { IFilterPumpCleaningMySuffix } from 'app/shared/model/pond/filter-pump-cleaning-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class FilterPumpCleaningMySuffixResolve implements Resolve<IFilterPumpCleaningMySuffix> {
    constructor(private service: FilterPumpCleaningMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((filterPumpCleaning: HttpResponse<FilterPumpCleaningMySuffix>) => filterPumpCleaning.body));
        }
        return of(new FilterPumpCleaningMySuffix());
    }
}

export const filterPumpCleaningRoute: Routes = [
    {
        path: 'filter-pump-cleaning-my-suffix',
        component: FilterPumpCleaningMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gateApp.pondFilterPumpCleaning.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'filter-pump-cleaning-my-suffix/:id/view',
        component: FilterPumpCleaningMySuffixDetailComponent,
        resolve: {
            filterPumpCleaning: FilterPumpCleaningMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondFilterPumpCleaning.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'filter-pump-cleaning-my-suffix/new',
        component: FilterPumpCleaningMySuffixUpdateComponent,
        resolve: {
            filterPumpCleaning: FilterPumpCleaningMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondFilterPumpCleaning.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'filter-pump-cleaning-my-suffix/:id/edit',
        component: FilterPumpCleaningMySuffixUpdateComponent,
        resolve: {
            filterPumpCleaning: FilterPumpCleaningMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondFilterPumpCleaning.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const filterPumpCleaningPopupRoute: Routes = [
    {
        path: 'filter-pump-cleaning-my-suffix/:id/delete',
        component: FilterPumpCleaningMySuffixDeletePopupComponent,
        resolve: {
            filterPumpCleaning: FilterPumpCleaningMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondFilterPumpCleaning.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
