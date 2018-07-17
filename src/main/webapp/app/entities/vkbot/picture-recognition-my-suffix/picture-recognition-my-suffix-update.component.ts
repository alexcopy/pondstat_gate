import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';
import { PictureRecognitionMySuffixService } from './picture-recognition-my-suffix.service';

@Component({
    selector: 'jhi-picture-recognition-my-suffix-update',
    templateUrl: './picture-recognition-my-suffix-update.component.html'
})
export class PictureRecognitionMySuffixUpdateComponent implements OnInit {
    private _pictureRecognition: IPictureRecognitionMySuffix;
    isSaving: boolean;

    constructor(private pictureRecognitionService: PictureRecognitionMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pictureRecognition }) => {
            this.pictureRecognition = pictureRecognition;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pictureRecognition.id !== undefined) {
            this.subscribeToSaveResponse(this.pictureRecognitionService.update(this.pictureRecognition));
        } else {
            this.subscribeToSaveResponse(this.pictureRecognitionService.create(this.pictureRecognition));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPictureRecognitionMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IPictureRecognitionMySuffix>) => this.onSaveSuccess(),
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
    get pictureRecognition() {
        return this._pictureRecognition;
    }

    set pictureRecognition(pictureRecognition: IPictureRecognitionMySuffix) {
        this._pictureRecognition = pictureRecognition;
    }
}
