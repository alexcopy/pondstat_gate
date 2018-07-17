import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';
import { ModelTrainingMySuffixService } from './model-training-my-suffix.service';

@Component({
    selector: 'jhi-model-training-my-suffix-update',
    templateUrl: './model-training-my-suffix-update.component.html'
})
export class ModelTrainingMySuffixUpdateComponent implements OnInit {
    private _modelTraining: IModelTrainingMySuffix;
    isSaving: boolean;

    constructor(private modelTrainingService: ModelTrainingMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ modelTraining }) => {
            this.modelTraining = modelTraining;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.modelTraining.id !== undefined) {
            this.subscribeToSaveResponse(this.modelTrainingService.update(this.modelTraining));
        } else {
            this.subscribeToSaveResponse(this.modelTrainingService.create(this.modelTraining));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IModelTrainingMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IModelTrainingMySuffix>) => this.onSaveSuccess(),
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
    get modelTraining() {
        return this._modelTraining;
    }

    set modelTraining(modelTraining: IModelTrainingMySuffix) {
        this._modelTraining = modelTraining;
    }
}
