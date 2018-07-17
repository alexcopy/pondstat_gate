import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IChemicalAnalysisMySuffix } from 'app/shared/model/pond/chemical-analysis-my-suffix.model';
import { ChemicalAnalysisMySuffixService } from './chemical-analysis-my-suffix.service';

@Component({
    selector: 'jhi-chemical-analysis-my-suffix-update',
    templateUrl: './chemical-analysis-my-suffix-update.component.html'
})
export class ChemicalAnalysisMySuffixUpdateComponent implements OnInit {
    private _chemicalAnalysis: IChemicalAnalysisMySuffix;
    isSaving: boolean;
    date: string;

    constructor(private chemicalAnalysisService: ChemicalAnalysisMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ chemicalAnalysis }) => {
            this.chemicalAnalysis = chemicalAnalysis;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.chemicalAnalysis.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.chemicalAnalysis.id !== undefined) {
            this.subscribeToSaveResponse(this.chemicalAnalysisService.update(this.chemicalAnalysis));
        } else {
            this.subscribeToSaveResponse(this.chemicalAnalysisService.create(this.chemicalAnalysis));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IChemicalAnalysisMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IChemicalAnalysisMySuffix>) => this.onSaveSuccess(),
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
    get chemicalAnalysis() {
        return this._chemicalAnalysis;
    }

    set chemicalAnalysis(chemicalAnalysis: IChemicalAnalysisMySuffix) {
        this._chemicalAnalysis = chemicalAnalysis;
        this.date = moment(chemicalAnalysis.date).format(DATE_TIME_FORMAT);
    }
}
