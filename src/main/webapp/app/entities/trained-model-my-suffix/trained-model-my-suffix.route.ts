import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TrainedModelMySuffixComponent } from './trained-model-my-suffix.component';
import { TrainedModelMySuffixDetailComponent } from './trained-model-my-suffix-detail.component';
import { TrainedModelMySuffixPopupComponent } from './trained-model-my-suffix-dialog.component';
import { TrainedModelMySuffixDeletePopupComponent } from './trained-model-my-suffix-delete-dialog.component';

@Injectable()
export class TrainedModelMySuffixResolvePagingParams implements Resolve<any> {

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

export const trainedModelRoute: Routes = [
    {
        path: 'trained-model-my-suffix',
        component: TrainedModelMySuffixComponent,
        resolve: {
            'pagingParams': TrainedModelMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.trainedModel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'trained-model-my-suffix/:id',
        component: TrainedModelMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.trainedModel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainedModelPopupRoute: Routes = [
    {
        path: 'trained-model-my-suffix-new',
        component: TrainedModelMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.trainedModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'trained-model-my-suffix/:id/edit',
        component: TrainedModelMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.trainedModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'trained-model-my-suffix/:id/delete',
        component: TrainedModelMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.trainedModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
