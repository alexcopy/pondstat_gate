import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OtherWorksMySuffix } from 'app/shared/model/pond/other-works-my-suffix.model';
import { OtherWorksMySuffixService } from './other-works-my-suffix.service';
import { OtherWorksMySuffixComponent } from './other-works-my-suffix.component';
import { OtherWorksMySuffixDetailComponent } from './other-works-my-suffix-detail.component';
import { OtherWorksMySuffixUpdateComponent } from './other-works-my-suffix-update.component';
import { OtherWorksMySuffixDeletePopupComponent } from './other-works-my-suffix-delete-dialog.component';
import { IOtherWorksMySuffix } from 'app/shared/model/pond/other-works-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OtherWorksMySuffixResolve implements Resolve<IOtherWorksMySuffix> {
    constructor(private service: OtherWorksMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((otherWorks: HttpResponse<OtherWorksMySuffix>) => otherWorks.body));
        }
        return of(new OtherWorksMySuffix());
    }
}

export const otherWorksRoute: Routes = [
    {
        path: 'other-works-my-suffix',
        component: OtherWorksMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondOtherWorks.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'other-works-my-suffix/:id/view',
        component: OtherWorksMySuffixDetailComponent,
        resolve: {
            otherWorks: OtherWorksMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondOtherWorks.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'other-works-my-suffix/new',
        component: OtherWorksMySuffixUpdateComponent,
        resolve: {
            otherWorks: OtherWorksMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondOtherWorks.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'other-works-my-suffix/:id/edit',
        component: OtherWorksMySuffixUpdateComponent,
        resolve: {
            otherWorks: OtherWorksMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondOtherWorks.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const otherWorksPopupRoute: Routes = [
    {
        path: 'other-works-my-suffix/:id/delete',
        component: OtherWorksMySuffixDeletePopupComponent,
        resolve: {
            otherWorks: OtherWorksMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondOtherWorks.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
