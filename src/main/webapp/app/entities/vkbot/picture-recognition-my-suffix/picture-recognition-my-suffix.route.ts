import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';
import { PictureRecognitionMySuffixService } from './picture-recognition-my-suffix.service';
import { PictureRecognitionMySuffixComponent } from './picture-recognition-my-suffix.component';
import { PictureRecognitionMySuffixDetailComponent } from './picture-recognition-my-suffix-detail.component';
import { PictureRecognitionMySuffixUpdateComponent } from './picture-recognition-my-suffix-update.component';
import { PictureRecognitionMySuffixDeletePopupComponent } from './picture-recognition-my-suffix-delete-dialog.component';
import { IPictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PictureRecognitionMySuffixResolve implements Resolve<IPictureRecognitionMySuffix> {
    constructor(private service: PictureRecognitionMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((pictureRecognition: HttpResponse<PictureRecognitionMySuffix>) => pictureRecognition.body));
        }
        return of(new PictureRecognitionMySuffix());
    }
}

export const pictureRecognitionRoute: Routes = [
    {
        path: 'picture-recognition-my-suffix',
        component: PictureRecognitionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotPictureRecognition.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'picture-recognition-my-suffix/:id/view',
        component: PictureRecognitionMySuffixDetailComponent,
        resolve: {
            pictureRecognition: PictureRecognitionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotPictureRecognition.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'picture-recognition-my-suffix/new',
        component: PictureRecognitionMySuffixUpdateComponent,
        resolve: {
            pictureRecognition: PictureRecognitionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotPictureRecognition.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'picture-recognition-my-suffix/:id/edit',
        component: PictureRecognitionMySuffixUpdateComponent,
        resolve: {
            pictureRecognition: PictureRecognitionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotPictureRecognition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pictureRecognitionPopupRoute: Routes = [
    {
        path: 'picture-recognition-my-suffix/:id/delete',
        component: PictureRecognitionMySuffixDeletePopupComponent,
        resolve: {
            pictureRecognition: PictureRecognitionMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotPictureRecognition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
