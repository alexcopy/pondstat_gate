import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';
import { ClarifaiProcessMySuffixService } from './clarifai-process-my-suffix.service';

@Component({
    selector: 'jhi-clarifai-process-my-suffix-update',
    templateUrl: './clarifai-process-my-suffix-update.component.html'
})
export class ClarifaiProcessMySuffixUpdateComponent implements OnInit {
    private _clarifaiProcess: IClarifaiProcessMySuffix;
    isSaving: boolean;

    constructor(private clarifaiProcessService: ClarifaiProcessMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ clarifaiProcess }) => {
            this.clarifaiProcess = clarifaiProcess;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.clarifaiProcess.id !== undefined) {
            this.subscribeToSaveResponse(this.clarifaiProcessService.update(this.clarifaiProcess));
        } else {
            this.subscribeToSaveResponse(this.clarifaiProcessService.create(this.clarifaiProcess));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClarifaiProcessMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IClarifaiProcessMySuffix>) => this.onSaveSuccess(),
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
    get clarifaiProcess() {
        return this._clarifaiProcess;
    }

    set clarifaiProcess(clarifaiProcess: IClarifaiProcessMySuffix) {
        this._clarifaiProcess = clarifaiProcess;
    }
}
