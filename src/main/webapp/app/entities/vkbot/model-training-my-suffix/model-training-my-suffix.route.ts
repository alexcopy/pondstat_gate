import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';
import { ModelTrainingMySuffixService } from './model-training-my-suffix.service';
import { ModelTrainingMySuffixComponent } from './model-training-my-suffix.component';
import { ModelTrainingMySuffixDetailComponent } from './model-training-my-suffix-detail.component';
import { ModelTrainingMySuffixUpdateComponent } from './model-training-my-suffix-update.component';
import { ModelTrainingMySuffixDeletePopupComponent } from './model-training-my-suffix-delete-dialog.component';
import { IModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ModelTrainingMySuffixResolve implements Resolve<IModelTrainingMySuffix> {
    constructor(private service: ModelTrainingMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((modelTraining: HttpResponse<ModelTrainingMySuffix>) => modelTraining.body));
        }
        return of(new ModelTrainingMySuffix());
    }
}

export const modelTrainingRoute: Routes = [
    {
        path: 'model-training-my-suffix',
        component: ModelTrainingMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotModelTraining.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'model-training-my-suffix/:id/view',
        component: ModelTrainingMySuffixDetailComponent,
        resolve: {
            modelTraining: ModelTrainingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotModelTraining.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'model-training-my-suffix/new',
        component: ModelTrainingMySuffixUpdateComponent,
        resolve: {
            modelTraining: ModelTrainingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotModelTraining.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'model-training-my-suffix/:id/edit',
        component: ModelTrainingMySuffixUpdateComponent,
        resolve: {
            modelTraining: ModelTrainingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotModelTraining.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modelTrainingPopupRoute: Routes = [
    {
        path: 'model-training-my-suffix/:id/delete',
        component: ModelTrainingMySuffixDeletePopupComponent,
        resolve: {
            modelTraining: ModelTrainingMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotModelTraining.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
