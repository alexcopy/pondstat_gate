import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClarifaisMySuffix } from 'app/shared/model/vkbot/clarifais-my-suffix.model';
import { ClarifaisMySuffixService } from './clarifais-my-suffix.service';
import { ClarifaisMySuffixComponent } from './clarifais-my-suffix.component';
import { ClarifaisMySuffixDetailComponent } from './clarifais-my-suffix-detail.component';
import { ClarifaisMySuffixUpdateComponent } from './clarifais-my-suffix-update.component';
import { ClarifaisMySuffixDeletePopupComponent } from './clarifais-my-suffix-delete-dialog.component';
import { IClarifaisMySuffix } from 'app/shared/model/vkbot/clarifais-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ClarifaisMySuffixResolve implements Resolve<IClarifaisMySuffix> {
    constructor(private service: ClarifaisMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((clarifais: HttpResponse<ClarifaisMySuffix>) => clarifais.body));
        }
        return of(new ClarifaisMySuffix());
    }
}

export const clarifaisRoute: Routes = [
    {
        path: 'clarifais-my-suffix',
        component: ClarifaisMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gateApp.vkbotClarifais.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'clarifais-my-suffix/:id/view',
        component: ClarifaisMySuffixDetailComponent,
        resolve: {
            clarifais: ClarifaisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotClarifais.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'clarifais-my-suffix/new',
        component: ClarifaisMySuffixUpdateComponent,
        resolve: {
            clarifais: ClarifaisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotClarifais.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'clarifais-my-suffix/:id/edit',
        component: ClarifaisMySuffixUpdateComponent,
        resolve: {
            clarifais: ClarifaisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotClarifais.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clarifaisPopupRoute: Routes = [
    {
        path: 'clarifais-my-suffix/:id/delete',
        component: ClarifaisMySuffixDeletePopupComponent,
        resolve: {
            clarifais: ClarifaisMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotClarifais.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
