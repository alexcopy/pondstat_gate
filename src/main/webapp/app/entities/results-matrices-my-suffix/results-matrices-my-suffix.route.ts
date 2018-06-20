import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ResultsMatricesMySuffixComponent } from './results-matrices-my-suffix.component';
import { ResultsMatricesMySuffixDetailComponent } from './results-matrices-my-suffix-detail.component';
import { ResultsMatricesMySuffixPopupComponent } from './results-matrices-my-suffix-dialog.component';
import { ResultsMatricesMySuffixDeletePopupComponent } from './results-matrices-my-suffix-delete-dialog.component';

export const resultsMatricesRoute: Routes = [
    {
        path: 'results-matrices-my-suffix',
        component: ResultsMatricesMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.resultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'results-matrices-my-suffix/:id',
        component: ResultsMatricesMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.resultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resultsMatricesPopupRoute: Routes = [
    {
        path: 'results-matrices-my-suffix-new',
        component: ResultsMatricesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.resultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'results-matrices-my-suffix/:id/edit',
        component: ResultsMatricesMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.resultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'results-matrices-my-suffix/:id/delete',
        component: ResultsMatricesMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.resultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
