import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GateSharedModule } from 'app/shared';
import {
    LiveStockMySuffixComponent,
    LiveStockMySuffixDetailComponent,
    LiveStockMySuffixUpdateComponent,
    LiveStockMySuffixDeletePopupComponent,
    LiveStockMySuffixDeleteDialogComponent,
    liveStockRoute,
    liveStockPopupRoute
} from './';

const ENTITY_STATES = [...liveStockRoute, ...liveStockPopupRoute];

@NgModule({
    imports: [GateSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LiveStockMySuffixComponent,
        LiveStockMySuffixDetailComponent,
        LiveStockMySuffixUpdateComponent,
        LiveStockMySuffixDeleteDialogComponent,
        LiveStockMySuffixDeletePopupComponent
    ],
    entryComponents: [
        LiveStockMySuffixComponent,
        LiveStockMySuffixUpdateComponent,
        LiveStockMySuffixDeleteDialogComponent,
        LiveStockMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GateLiveStockMySuffixModule {}
