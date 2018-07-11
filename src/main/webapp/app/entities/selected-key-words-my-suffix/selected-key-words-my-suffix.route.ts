import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SelectedKeyWordsMySuffixComponent } from './selected-key-words-my-suffix.component';
import { SelectedKeyWordsMySuffixDetailComponent } from './selected-key-words-my-suffix-detail.component';
import { SelectedKeyWordsMySuffixPopupComponent } from './selected-key-words-my-suffix-dialog.component';
import { SelectedKeyWordsMySuffixDeletePopupComponent } from './selected-key-words-my-suffix-delete-dialog.component';

export const selectedKeyWordsRoute: Routes = [
    {
        path: 'selected-key-words-my-suffix',
        component: SelectedKeyWordsMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.selectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'selected-key-words-my-suffix/:id',
        component: SelectedKeyWordsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.selectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const selectedKeyWordsPopupRoute: Routes = [
    {
        path: 'selected-key-words-my-suffix-new',
        component: SelectedKeyWordsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.selectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'selected-key-words-my-suffix/:id/edit',
        component: SelectedKeyWordsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.selectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'selected-key-words-my-suffix/:id/delete',
        component: SelectedKeyWordsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.selectedKeyWords.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
