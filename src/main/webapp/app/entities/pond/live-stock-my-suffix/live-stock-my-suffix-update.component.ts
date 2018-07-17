import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ILiveStockMySuffix } from 'app/shared/model/pond/live-stock-my-suffix.model';
import { LiveStockMySuffixService } from './live-stock-my-suffix.service';

@Component({
    selector: 'jhi-live-stock-my-suffix-update',
    templateUrl: './live-stock-my-suffix-update.component.html'
})
export class LiveStockMySuffixUpdateComponent implements OnInit {
    private _liveStock: ILiveStockMySuffix;
    isSaving: boolean;
    date: string;

    constructor(private liveStockService: LiveStockMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ liveStock }) => {
            this.liveStock = liveStock;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.liveStock.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.liveStock.id !== undefined) {
            this.subscribeToSaveResponse(this.liveStockService.update(this.liveStock));
        } else {
            this.subscribeToSaveResponse(this.liveStockService.create(this.liveStock));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILiveStockMySuffix>>) {
        result.subscribe((res: HttpResponse<ILiveStockMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get liveStock() {
        return this._liveStock;
    }

    set liveStock(liveStock: ILiveStockMySuffix) {
        this._liveStock = liveStock;
        this.date = moment(liveStock.date).format(DATE_TIME_FORMAT);
    }
}
