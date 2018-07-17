import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TrainedModelMySuffix } from 'app/shared/model/vkbot/trained-model-my-suffix.model';
import { TrainedModelMySuffixService } from './trained-model-my-suffix.service';
import { TrainedModelMySuffixComponent } from './trained-model-my-suffix.component';
import { TrainedModelMySuffixDetailComponent } from './trained-model-my-suffix-detail.component';
import { TrainedModelMySuffixUpdateComponent } from './trained-model-my-suffix-update.component';
import { TrainedModelMySuffixDeletePopupComponent } from './trained-model-my-suffix-delete-dialog.component';
import { ITrainedModelMySuffix } from 'app/shared/model/vkbot/trained-model-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TrainedModelMySuffixResolve implements Resolve<ITrainedModelMySuffix> {
    constructor(private service: TrainedModelMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((trainedModel: HttpResponse<TrainedModelMySuffix>) => trainedModel.body));
        }
        return of(new TrainedModelMySuffix());
    }
}

export const trainedModelRoute: Routes = [
    {
        path: 'trained-model-my-suffix',
        component: TrainedModelMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'gateApp.vkbotTrainedModel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'trained-model-my-suffix/:id/view',
        component: TrainedModelMySuffixDetailComponent,
        resolve: {
            trainedModel: TrainedModelMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotTrainedModel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'trained-model-my-suffix/new',
        component: TrainedModelMySuffixUpdateComponent,
        resolve: {
            trainedModel: TrainedModelMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotTrainedModel.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'trained-model-my-suffix/:id/edit',
        component: TrainedModelMySuffixUpdateComponent,
        resolve: {
            trainedModel: TrainedModelMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotTrainedModel.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainedModelPopupRoute: Routes = [
    {
        path: 'trained-model-my-suffix/:id/delete',
        component: TrainedModelMySuffixDeletePopupComponent,
        resolve: {
            trainedModel: TrainedModelMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotTrainedModel.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
