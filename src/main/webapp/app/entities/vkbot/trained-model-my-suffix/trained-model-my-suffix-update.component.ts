import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITrainedModelMySuffix } from 'app/shared/model/vkbot/trained-model-my-suffix.model';
import { TrainedModelMySuffixService } from './trained-model-my-suffix.service';

@Component({
    selector: 'jhi-trained-model-my-suffix-update',
    templateUrl: './trained-model-my-suffix-update.component.html'
})
export class TrainedModelMySuffixUpdateComponent implements OnInit {
    private _trainedModel: ITrainedModelMySuffix;
    isSaving: boolean;

    constructor(private trainedModelService: TrainedModelMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ trainedModel }) => {
            this.trainedModel = trainedModel;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.trainedModel.id !== undefined) {
            this.subscribeToSaveResponse(this.trainedModelService.update(this.trainedModel));
        } else {
            this.subscribeToSaveResponse(this.trainedModelService.create(this.trainedModel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITrainedModelMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ITrainedModelMySuffix>) => this.onSaveSuccess(),
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
    get trainedModel() {
        return this._trainedModel;
    }

    set trainedModel(trainedModel: ITrainedModelMySuffix) {
        this._trainedModel = trainedModel;
    }
}
