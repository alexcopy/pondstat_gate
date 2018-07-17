import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFilterPumpCleaningMySuffix } from 'app/shared/model/pond/filter-pump-cleaning-my-suffix.model';
import { FilterPumpCleaningMySuffixService } from './filter-pump-cleaning-my-suffix.service';

@Component({
    selector: 'jhi-filter-pump-cleaning-my-suffix-update',
    templateUrl: './filter-pump-cleaning-my-suffix-update.component.html'
})
export class FilterPumpCleaningMySuffixUpdateComponent implements OnInit {
    private _filterPumpCleaning: IFilterPumpCleaningMySuffix;
    isSaving: boolean;
    cleaningDate: string;

    constructor(private filterPumpCleaningService: FilterPumpCleaningMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ filterPumpCleaning }) => {
            this.filterPumpCleaning = filterPumpCleaning;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.filterPumpCleaning.cleaningDate = moment(this.cleaningDate, DATE_TIME_FORMAT);
        if (this.filterPumpCleaning.id !== undefined) {
            this.subscribeToSaveResponse(this.filterPumpCleaningService.update(this.filterPumpCleaning));
        } else {
            this.subscribeToSaveResponse(this.filterPumpCleaningService.create(this.filterPumpCleaning));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFilterPumpCleaningMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IFilterPumpCleaningMySuffix>) => this.onSaveSuccess(),
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
    get filterPumpCleaning() {
        return this._filterPumpCleaning;
    }

    set filterPumpCleaning(filterPumpCleaning: IFilterPumpCleaningMySuffix) {
        this._filterPumpCleaning = filterPumpCleaning;
        this.cleaningDate = moment(filterPumpCleaning.cleaningDate).format(DATE_TIME_FORMAT);
    }
}
