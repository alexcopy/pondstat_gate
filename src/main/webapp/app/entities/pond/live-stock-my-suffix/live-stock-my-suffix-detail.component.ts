import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILiveStockMySuffix } from 'app/shared/model/pond/live-stock-my-suffix.model';

@Component({
    selector: 'jhi-live-stock-my-suffix-detail',
    templateUrl: './live-stock-my-suffix-detail.component.html'
})
export class LiveStockMySuffixDetailComponent implements OnInit {
    liveStock: ILiveStockMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ liveStock }) => {
            this.liveStock = liveStock;
        });
    }

    previousState() {
        window.history.back();
    }
}
