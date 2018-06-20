import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TrainedModelMySuffix } from './trained-model-my-suffix.model';
import { TrainedModelMySuffixPopupService } from './trained-model-my-suffix-popup.service';
import { TrainedModelMySuffixService } from './trained-model-my-suffix.service';

@Component({
    selector: 'jhi-trained-model-my-suffix-dialog',
    templateUrl: './trained-model-my-suffix-dialog.component.html'
})
export class TrainedModelMySuffixDialogComponent implements OnInit {

    trainedModel: TrainedModelMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private trainedModelService: TrainedModelMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.trainedModel.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trainedModelService.update(this.trainedModel));
        } else {
            this.subscribeToSaveResponse(
                this.trainedModelService.create(this.trainedModel));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TrainedModelMySuffix>>) {
        result.subscribe((res: HttpResponse<TrainedModelMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TrainedModelMySuffix) {
        this.eventManager.broadcast({ name: 'trainedModelListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-trained-model-my-suffix-popup',
    template: ''
})
export class TrainedModelMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trainedModelPopupService: TrainedModelMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trainedModelPopupService
                    .open(TrainedModelMySuffixDialogComponent as Component, params['id']);
            } else {
                this.trainedModelPopupService
                    .open(TrainedModelMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
