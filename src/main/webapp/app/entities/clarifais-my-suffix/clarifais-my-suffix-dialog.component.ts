import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClarifaisMySuffix } from './clarifais-my-suffix.model';
import { ClarifaisMySuffixPopupService } from './clarifais-my-suffix-popup.service';
import { ClarifaisMySuffixService } from './clarifais-my-suffix.service';

@Component({
    selector: 'jhi-clarifais-my-suffix-dialog',
    templateUrl: './clarifais-my-suffix-dialog.component.html'
})
export class ClarifaisMySuffixDialogComponent implements OnInit {

    clarifais: ClarifaisMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private clarifaisService: ClarifaisMySuffixService,
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
        if (this.clarifais.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clarifaisService.update(this.clarifais));
        } else {
            this.subscribeToSaveResponse(
                this.clarifaisService.create(this.clarifais));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClarifaisMySuffix>>) {
        result.subscribe((res: HttpResponse<ClarifaisMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClarifaisMySuffix) {
        this.eventManager.broadcast({ name: 'clarifaisListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-clarifais-my-suffix-popup',
    template: ''
})
export class ClarifaisMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clarifaisPopupService: ClarifaisMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clarifaisPopupService
                    .open(ClarifaisMySuffixDialogComponent as Component, params['id']);
            } else {
                this.clarifaisPopupService
                    .open(ClarifaisMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
