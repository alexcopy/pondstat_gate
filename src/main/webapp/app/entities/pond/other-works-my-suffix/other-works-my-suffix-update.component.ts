import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IOtherWorksMySuffix } from 'app/shared/model/pond/other-works-my-suffix.model';
import { OtherWorksMySuffixService } from './other-works-my-suffix.service';

@Component({
    selector: 'jhi-other-works-my-suffix-update',
    templateUrl: './other-works-my-suffix-update.component.html'
})
export class OtherWorksMySuffixUpdateComponent implements OnInit {
    private _otherWorks: IOtherWorksMySuffix;
    isSaving: boolean;
    date: string;

    constructor(private otherWorksService: OtherWorksMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ otherWorks }) => {
            this.otherWorks = otherWorks;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.otherWorks.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.otherWorks.id !== undefined) {
            this.subscribeToSaveResponse(this.otherWorksService.update(this.otherWorks));
        } else {
            this.subscribeToSaveResponse(this.otherWorksService.create(this.otherWorks));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOtherWorksMySuffix>>) {
        result.subscribe((res: HttpResponse<IOtherWorksMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get otherWorks() {
        return this._otherWorks;
    }

    set otherWorks(otherWorks: IOtherWorksMySuffix) {
        this._otherWorks = otherWorks;
        this.date = moment(otherWorks.date).format(DATE_TIME_FORMAT);
    }
}
