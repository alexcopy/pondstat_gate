import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';
import { TankMySuffixService } from './tank-my-suffix.service';
import { TankMySuffixComponent } from './tank-my-suffix.component';
import { TankMySuffixDetailComponent } from './tank-my-suffix-detail.component';
import { TankMySuffixUpdateComponent } from './tank-my-suffix-update.component';
import { TankMySuffixDeletePopupComponent } from './tank-my-suffix-delete-dialog.component';
import { ITankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TankMySuffixResolve implements Resolve<ITankMySuffix> {
    constructor(private service: TankMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tank: HttpResponse<TankMySuffix>) => tank.body));
        }
        return of(new TankMySuffix());
    }
}

export const tankRoute: Routes = [
    {
        path: 'tank-my-suffix',
        component: TankMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tank-my-suffix/:id/view',
        component: TankMySuffixDetailComponent,
        resolve: {
            tank: TankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tank-my-suffix/new',
        component: TankMySuffixUpdateComponent,
        resolve: {
            tank: TankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tank-my-suffix/:id/edit',
        component: TankMySuffixUpdateComponent,
        resolve: {
            tank: TankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTank.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tankPopupRoute: Routes = [
    {
        path: 'tank-my-suffix/:id/delete',
        component: TankMySuffixDeletePopupComponent,
        resolve: {
            tank: TankMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.pondTank.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
