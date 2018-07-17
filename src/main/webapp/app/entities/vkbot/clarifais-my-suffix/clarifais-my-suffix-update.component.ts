import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IClarifaisMySuffix } from 'app/shared/model/vkbot/clarifais-my-suffix.model';
import { ClarifaisMySuffixService } from './clarifais-my-suffix.service';

@Component({
    selector: 'jhi-clarifais-my-suffix-update',
    templateUrl: './clarifais-my-suffix-update.component.html'
})
export class ClarifaisMySuffixUpdateComponent implements OnInit {
    private _clarifais: IClarifaisMySuffix;
    isSaving: boolean;

    constructor(private clarifaisService: ClarifaisMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ clarifais }) => {
            this.clarifais = clarifais;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.clarifais.id !== undefined) {
            this.subscribeToSaveResponse(this.clarifaisService.update(this.clarifais));
        } else {
            this.subscribeToSaveResponse(this.clarifaisService.create(this.clarifais));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClarifaisMySuffix>>) {
        result.subscribe((res: HttpResponse<IClarifaisMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get clarifais() {
        return this._clarifais;
    }

    set clarifais(clarifais: IClarifaisMySuffix) {
        this._clarifais = clarifais;
    }
}
