import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChemicalsMySuffix } from 'app/shared/model/pond/chemicals-my-suffix.model';
import { ChemicalsMySuffixService } from './chemicals-my-suffix.service';
import { ChemicalsMySuffixComponent } from './chemicals-my-suffix.component';
import { ChemicalsMySuffixDetailComponent } from './chemicals-my-suffix-detail.component';
import { ChemicalsMySuffixUpdateComponent } from './chemicals-my-suffix-update.component';
import { ChemicalsMySuffixDeletePopupComponent } from './chemicals-my-suffix-delete-dialog.component';
import { IChemicalsMySuffix } from 'app/shared/model/pond/chemicals-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ChemicalsMySuffixResolve implements Resolve<IChemicalsMySuffix> {
    constructor(private service: ChemicalsMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((chemicals: HttpResponse<ChemicalsMySuffix>) => chemicals.body));
        }
        return of(new ChemicalsMySuffix());
    }
}

export const chemicalsRoute: Routes = [
    {
        path: 'chemicals-my-suffix',
        component: ChemicalsMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gateApp.pondChemicals.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chemicals-my-suffix/:id/view',
        component: ChemicalsMySuffixDetailComponent,
        resolve: {
            chemicals: ChemicalsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondChemicals.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chemicals-my-suffix/new',
        component: ChemicalsMySuffixUpdateComponent,
        resolve: {
            chemicals: ChemicalsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondChemicals.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'chemicals-my-suffix/:id/edit',
        component: ChemicalsMySuffixUpdateComponent,
        resolve: {
            chemicals: ChemicalsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondChemicals.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chemicalsPopupRoute: Routes = [
    {
        path: 'chemicals-my-suffix/:id/delete',
        component: ChemicalsMySuffixDeletePopupComponent,
        resolve: {
            chemicals: ChemicalsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondChemicals.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
