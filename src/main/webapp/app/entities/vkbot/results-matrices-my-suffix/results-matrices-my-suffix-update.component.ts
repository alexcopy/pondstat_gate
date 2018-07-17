import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';
import { ResultsMatricesMySuffixService } from './results-matrices-my-suffix.service';

@Component({
    selector: 'jhi-results-matrices-my-suffix-update',
    templateUrl: './results-matrices-my-suffix-update.component.html'
})
export class ResultsMatricesMySuffixUpdateComponent implements OnInit {
    private _resultsMatrices: IResultsMatricesMySuffix;
    isSaving: boolean;

    constructor(private resultsMatricesService: ResultsMatricesMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ resultsMatrices }) => {
            this.resultsMatrices = resultsMatrices;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.resultsMatrices.id !== undefined) {
            this.subscribeToSaveResponse(this.resultsMatricesService.update(this.resultsMatrices));
        } else {
            this.subscribeToSaveResponse(this.resultsMatricesService.create(this.resultsMatrices));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IResultsMatricesMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IResultsMatricesMySuffix>) => this.onSaveSuccess(),
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
    get resultsMatrices() {
        return this._resultsMatrices;
    }

    set resultsMatrices(resultsMatrices: IResultsMatricesMySuffix) {
        this._resultsMatrices = resultsMatrices;
    }
}
