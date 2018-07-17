import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';
import { SelectedKeyWordsMySuffixService } from './selected-key-words-my-suffix.service';
import { SelectedKeyWordsMySuffixComponent } from './selected-key-words-my-suffix.component';
import { SelectedKeyWordsMySuffixDetailComponent } from './selected-key-words-my-suffix-detail.component';
import { SelectedKeyWordsMySuffixUpdateComponent } from './selected-key-words-my-suffix-update.component';
import { SelectedKeyWordsMySuffixDeletePopupComponent } from './selected-key-words-my-suffix-delete-dialog.component';
import { ISelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class SelectedKeyWordsMySuffixResolve implements Resolve<ISelectedKeyWordsMySuffix> {
    constructor(private service: SelectedKeyWordsMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((selectedKeyWords: HttpResponse<SelectedKeyWordsMySuffix>) => selectedKeyWords.body));
        }
        return of(new SelectedKeyWordsMySuffix());
    }
}

export const selectedKeyWordsRoute: Routes = [
    {
        path: 'selected-key-words-my-suffix',
        component: SelectedKeyWordsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSelectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'selected-key-words-my-suffix/:id/view',
        component: SelectedKeyWordsMySuffixDetailComponent,
        resolve: {
            selectedKeyWords: SelectedKeyWordsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSelectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'selected-key-words-my-suffix/new',
        component: SelectedKeyWordsMySuffixUpdateComponent,
        resolve: {
            selectedKeyWords: SelectedKeyWordsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSelectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'selected-key-words-my-suffix/:id/edit',
        component: SelectedKeyWordsMySuffixUpdateComponent,
        resolve: {
            selectedKeyWords: SelectedKeyWordsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSelectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const selectedKeyWordsPopupRoute: Routes = [
    {
        path: 'selected-key-words-my-suffix/:id/delete',
        component: SelectedKeyWordsMySuffixDeletePopupComponent,
        resolve: {
            selectedKeyWords: SelectedKeyWordsMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSelectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
