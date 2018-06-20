import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ResultsMatricesMySuffix } from './results-matrices-my-suffix.model';
import { ResultsMatricesMySuffixPopupService } from './results-matrices-my-suffix-popup.service';
import { ResultsMatricesMySuffixService } from './results-matrices-my-suffix.service';

@Component({
    selector: 'jhi-results-matrices-my-suffix-dialog',
    templateUrl: './results-matrices-my-suffix-dialog.component.html'
})
export class ResultsMatricesMySuffixDialogComponent implements OnInit {

    resultsMatrices: ResultsMatricesMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private resultsMatricesService: ResultsMatricesMySuffixService,
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
        if (this.resultsMatrices.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resultsMatricesService.update(this.resultsMatrices));
        } else {
            this.subscribeToSaveResponse(
                this.resultsMatricesService.create(this.resultsMatrices));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ResultsMatricesMySuffix>>) {
        result.subscribe((res: HttpResponse<ResultsMatricesMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ResultsMatricesMySuffix) {
        this.eventManager.broadcast({ name: 'resultsMatricesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-results-matrices-my-suffix-popup',
    template: ''
})
export class ResultsMatricesMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resultsMatricesPopupService: ResultsMatricesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resultsMatricesPopupService
                    .open(ResultsMatricesMySuffixDialogComponent as Component, params['id']);
            } else {
                this.resultsMatricesPopupService
                    .open(ResultsMatricesMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
