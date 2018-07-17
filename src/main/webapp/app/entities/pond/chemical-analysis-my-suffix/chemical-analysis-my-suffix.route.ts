import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChemicalAnalysisMySuffix } from 'app/shared/model/pond/chemical-analysis-my-suffix.model';
import { ChemicalAnalysisMySuffixService } from './chemical-analysis-my-suffix.service';
import { ChemicalAnalysisMySuffixComponent } from './chemical-analysis-my-suffix.component';
import { ChemicalAnalysisMySuffixDetailComponent } from './chemical-analysis-my-suffix-detail.component';
import { ChemicalAnalysisMySuffixUpdateComponent } from './chemical-analysis-my-suffix-update.component';
import { ChemicalAnalysisMySuffixDeletePopupComponent } from './chemical-analysis-my-suffix-delete-dialog.component';
import { IChemicalAnalysisMySuffix } from 'app/shared/model/pond/chemical-analysis-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ChemicalAnalysisMySuffixResolve implements Resolve<IChemicalAnalysisMySuffix> {
    constructor(private service: ChemicalAnalysisMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((chemicalAnalysis: HttpResponse<ChemicalAnalysisMySuffix>) => chemicalAnalysis.body));
        }
        return of(new ChemicalAnalysisMySuffix());
    }
}

export const chemicalAnalysisRoute: Routes = [
    {
        path: 'chemical-analysis-my-suffix',
        component: ChemicalAnalysisMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gateApp.pondChemicalAnalysis.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chemical-analysis-my-suffix/:id/view',
        component: ChemicalAnalysisMySuffixDetailComponent,
        resolve: {
            chemicalAnalysis: ChemicalAnalysisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondChemicalAnalysis.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chemical-analysis-my-suffix/new',
        component: ChemicalAnalysisMySuffixUpdateComponent,
        resolve: {
            chemicalAnalysis: ChemicalAnalysisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondChemicalAnalysis.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chemical-analysis-my-suffix/:id/edit',
        component: ChemicalAnalysisMySuffixUpdateComponent,
        resolve: {
            chemicalAnalysis: ChemicalAnalysisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondChemicalAnalysis.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chemicalAnalysisPopupRoute: Routes = [
    {
        path: 'chemical-analysis-my-suffix/:id/delete',
        component: ChemicalAnalysisMySuffixDeletePopupComponent,
        resolve: {
            chemicalAnalysis: ChemicalAnalysisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondChemicalAnalysis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
