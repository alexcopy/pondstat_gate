import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMeterReadingMySuffix } from 'app/shared/model/pond/meter-reading-my-suffix.model';
import { MeterReadingMySuffixService } from './meter-reading-my-suffix.service';

@Component({
    selector: 'jhi-meter-reading-my-suffix-update',
    templateUrl: './meter-reading-my-suffix-update.component.html'
})
export class MeterReadingMySuffixUpdateComponent implements OnInit {
    private _meterReading: IMeterReadingMySuffix;
    isSaving: boolean;
    readingDate: string;

    constructor(private meterReadingService: MeterReadingMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ meterReading }) => {
            this.meterReading = meterReading;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.meterReading.readingDate = moment(this.readingDate, DATE_TIME_FORMAT);
        if (this.meterReading.id !== undefined) {
            this.subscribeToSaveResponse(this.meterReadingService.update(this.meterReading));
        } else {
            this.subscribeToSaveResponse(this.meterReadingService.create(this.meterReading));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMeterReadingMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IMeterReadingMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get meterReading() {
        return this._meterReading;
    }

    set meterReading(meterReading: IMeterReadingMySuffix) {
        this._meterReading = meterReading;
        this.readingDate = moment(meterReading.readingDate).format(DATE_TIME_FORMAT);
    }
}
