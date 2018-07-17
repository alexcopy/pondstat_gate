import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IChemicalsMySuffix } from 'app/shared/model/pond/chemicals-my-suffix.model';
import { ChemicalsMySuffixService } from './chemicals-my-suffix.service';

@Component({
    selector: 'jhi-chemicals-my-suffix-update',
    templateUrl: './chemicals-my-suffix-update.component.html'
})
export class ChemicalsMySuffixUpdateComponent implements OnInit {
    private _chemicals: IChemicalsMySuffix;
    isSaving: boolean;
    date: string;

    constructor(private chemicalsService: ChemicalsMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ chemicals }) => {
            this.chemicals = chemicals;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.chemicals.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.chemicals.id !== undefined) {
            this.subscribeToSaveResponse(this.chemicalsService.update(this.chemicals));
        } else {
            this.subscribeToSaveResponse(this.chemicalsService.create(this.chemicals));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IChemicalsMySuffix>>) {
        result.subscribe((res: HttpResponse<IChemicalsMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get chemicals() {
        return this._chemicals;
    }

    set chemicals(chemicals: IChemicalsMySuffix) {
        this._chemicals = chemicals;
        this.date = moment(chemicals.date).format(DATE_TIME_FORMAT);
    }
}
