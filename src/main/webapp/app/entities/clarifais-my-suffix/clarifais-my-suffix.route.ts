import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ClarifaisMySuffixComponent } from './clarifais-my-suffix.component';
import { ClarifaisMySuffixDetailComponent } from './clarifais-my-suffix-detail.component';
import { ClarifaisMySuffixPopupComponent } from './clarifais-my-suffix-dialog.component';
import { ClarifaisMySuffixDeletePopupComponent } from './clarifais-my-suffix-delete-dialog.component';

@Injectable()
export class ClarifaisMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const clarifaisRoute: Routes = [
    {
        path: 'clarifais-my-suffix',
        component: ClarifaisMySuffixComponent,
        resolve: {
            'pagingParams': ClarifaisMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.clarifais.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'clarifais-my-suffix/:id',
        component: ClarifaisMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.clarifais.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clarifaisPopupRoute: Routes = [
    {
        path: 'clarifais-my-suffix-new',
        component: ClarifaisMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.clarifais.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clarifais-my-suffix/:id/edit',
        component: ClarifaisMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.clarifais.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clarifais-my-suffix/:id/delete',
        component: ClarifaisMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.clarifais.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
