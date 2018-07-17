import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';
import { ClarifaiProcessMySuffixService } from './clarifai-process-my-suffix.service';
import { ClarifaiProcessMySuffixComponent } from './clarifai-process-my-suffix.component';
import { ClarifaiProcessMySuffixDetailComponent } from './clarifai-process-my-suffix-detail.component';
import { ClarifaiProcessMySuffixUpdateComponent } from './clarifai-process-my-suffix-update.component';
import { ClarifaiProcessMySuffixDeletePopupComponent } from './clarifai-process-my-suffix-delete-dialog.component';
import { IClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ClarifaiProcessMySuffixResolve implements Resolve<IClarifaiProcessMySuffix> {
    constructor(private service: ClarifaiProcessMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((clarifaiProcess: HttpResponse<ClarifaiProcessMySuffix>) => clarifaiProcess.body));
        }
        return of(new ClarifaiProcessMySuffix());
    }
}

export const clarifaiProcessRoute: Routes = [
    {
        path: 'clarifai-process-my-suffix',
        component: ClarifaiProcessMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotClarifaiProcess.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'clarifai-process-my-suffix/:id/view',
        component: ClarifaiProcessMySuffixDetailComponent,
        resolve: {
            clarifaiProcess: ClarifaiProcessMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotClarifaiProcess.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'clarifai-process-my-suffix/new',
        component: ClarifaiProcessMySuffixUpdateComponent,
        resolve: {
            clarifaiProcess: ClarifaiProcessMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotClarifaiProcess.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'clarifai-process-my-suffix/:id/edit',
        component: ClarifaiProcessMySuffixUpdateComponent,
        resolve: {
            clarifaiProcess: ClarifaiProcessMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotClarifaiProcess.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clarifaiProcessPopupRoute: Routes = [
    {
        path: 'clarifai-process-my-suffix/:id/delete',
        component: ClarifaiProcessMySuffixDeletePopupComponent,
        resolve: {
            clarifaiProcess: ClarifaiProcessMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotClarifaiProcess.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
