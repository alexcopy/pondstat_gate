import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IWaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';
import { WaterChangeMySuffixService } from './water-change-my-suffix.service';

@Component({
    selector: 'jhi-water-change-my-suffix-update',
    templateUrl: './water-change-my-suffix-update.component.html'
})
export class WaterChangeMySuffixUpdateComponent implements OnInit {
    private _waterChange: IWaterChangeMySuffix;
    isSaving: boolean;
    changeDate: string;

    constructor(private waterChangeService: WaterChangeMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ waterChange }) => {
            this.waterChange = waterChange;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.waterChange.changeDate = moment(this.changeDate, DATE_TIME_FORMAT);
        if (this.waterChange.id !== undefined) {
            this.subscribeToSaveResponse(this.waterChangeService.update(this.waterChange));
        } else {
            this.subscribeToSaveResponse(this.waterChangeService.create(this.waterChange));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWaterChangeMySuffix>>) {
        result.subscribe((res: HttpResponse<IWaterChangeMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get waterChange() {
        return this._waterChange;
    }

    set waterChange(waterChange: IWaterChangeMySuffix) {
        this._waterChange = waterChange;
        this.changeDate = moment(waterChange.changeDate).format(DATE_TIME_FORMAT);
    }
}
