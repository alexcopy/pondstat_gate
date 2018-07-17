import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';
import { ResultsMatricesMySuffixService } from './results-matrices-my-suffix.service';
import { ResultsMatricesMySuffixComponent } from './results-matrices-my-suffix.component';
import { ResultsMatricesMySuffixDetailComponent } from './results-matrices-my-suffix-detail.component';
import { ResultsMatricesMySuffixUpdateComponent } from './results-matrices-my-suffix-update.component';
import { ResultsMatricesMySuffixDeletePopupComponent } from './results-matrices-my-suffix-delete-dialog.component';
import { IResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ResultsMatricesMySuffixResolve implements Resolve<IResultsMatricesMySuffix> {
    constructor(private service: ResultsMatricesMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((resultsMatrices: HttpResponse<ResultsMatricesMySuffix>) => resultsMatrices.body));
        }
        return of(new ResultsMatricesMySuffix());
    }
}

export const resultsMatricesRoute: Routes = [
    {
        path: 'results-matrices-my-suffix',
        component: ResultsMatricesMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotResultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'results-matrices-my-suffix/:id/view',
        component: ResultsMatricesMySuffixDetailComponent,
        resolve: {
            resultsMatrices: ResultsMatricesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotResultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'results-matrices-my-suffix/new',
        component: ResultsMatricesMySuffixUpdateComponent,
        resolve: {
            resultsMatrices: ResultsMatricesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotResultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'results-matrices-my-suffix/:id/edit',
        component: ResultsMatricesMySuffixUpdateComponent,
        resolve: {
            resultsMatrices: ResultsMatricesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotResultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const resultsMatricesPopupRoute: Routes = [
    {
        path: 'results-matrices-my-suffix/:id/delete',
        component: ResultsMatricesMySuffixDeletePopupComponent,
        resolve: {
            resultsMatrices: ResultsMatricesMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotResultsMatrices.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
