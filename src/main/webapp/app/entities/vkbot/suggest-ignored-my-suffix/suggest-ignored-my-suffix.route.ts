import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';
import { SuggestIgnoredMySuffixService } from './suggest-ignored-my-suffix.service';
import { SuggestIgnoredMySuffixComponent } from './suggest-ignored-my-suffix.component';
import { SuggestIgnoredMySuffixDetailComponent } from './suggest-ignored-my-suffix-detail.component';
import { SuggestIgnoredMySuffixUpdateComponent } from './suggest-ignored-my-suffix-update.component';
import { SuggestIgnoredMySuffixDeletePopupComponent } from './suggest-ignored-my-suffix-delete-dialog.component';
import { ISuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class SuggestIgnoredMySuffixResolve implements Resolve<ISuggestIgnoredMySuffix> {
    constructor(private service: SuggestIgnoredMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((suggestIgnored: HttpResponse<SuggestIgnoredMySuffix>) => suggestIgnored.body));
        }
        return of(new SuggestIgnoredMySuffix());
    }
}

export const suggestIgnoredRoute: Routes = [
    {
        path: 'suggest-ignored-my-suffix',
        component: SuggestIgnoredMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSuggestIgnored.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'suggest-ignored-my-suffix/:id/view',
        component: SuggestIgnoredMySuffixDetailComponent,
        resolve: {
            suggestIgnored: SuggestIgnoredMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSuggestIgnored.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'suggest-ignored-my-suffix/new',
        component: SuggestIgnoredMySuffixUpdateComponent,
        resolve: {
            suggestIgnored: SuggestIgnoredMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSuggestIgnored.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'suggest-ignored-my-suffix/:id/edit',
        component: SuggestIgnoredMySuffixUpdateComponent,
        resolve: {
            suggestIgnored: SuggestIgnoredMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSuggestIgnored.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const suggestIgnoredPopupRoute: Routes = [
    {
        path: 'suggest-ignored-my-suffix/:id/delete',
        component: SuggestIgnoredMySuffixDeletePopupComponent,
        resolve: {
            suggestIgnored: SuggestIgnoredMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.vkbotSuggestIgnored.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
