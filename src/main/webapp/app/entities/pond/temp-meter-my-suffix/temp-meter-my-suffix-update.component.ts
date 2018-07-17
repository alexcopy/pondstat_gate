import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITempMeterMySuffix } from 'app/shared/model/pond/temp-meter-my-suffix.model';
import { TempMeterMySuffixService } from './temp-meter-my-suffix.service';

@Component({
    selector: 'jhi-temp-meter-my-suffix-update',
    templateUrl: './temp-meter-my-suffix-update.component.html'
})
export class TempMeterMySuffixUpdateComponent implements OnInit {
    private _tempMeter: ITempMeterMySuffix;
    isSaving: boolean;
    readingDate: string;

    constructor(private tempMeterService: TempMeterMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tempMeter }) => {
            this.tempMeter = tempMeter;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.tempMeter.readingDate = moment(this.readingDate, DATE_TIME_FORMAT);
        if (this.tempMeter.id !== undefined) {
            this.subscribeToSaveResponse(this.tempMeterService.update(this.tempMeter));
        } else {
            this.subscribeToSaveResponse(this.tempMeterService.create(this.tempMeter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITempMeterMySuffix>>) {
        result.subscribe((res: HttpResponse<ITempMeterMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tempMeter() {
        return this._tempMeter;
    }

    set tempMeter(tempMeter: ITempMeterMySuffix) {
        this._tempMeter = tempMeter;
        this.readingDate = moment(tempMeter.readingDate).format(DATE_TIME_FORMAT);
    }
}
