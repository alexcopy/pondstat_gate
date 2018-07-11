import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SelectedKeyWordsMySuffix } from './selected-key-words-my-suffix.model';
import { SelectedKeyWordsMySuffixPopupService } from './selected-key-words-my-suffix-popup.service';
import { SelectedKeyWordsMySuffixService } from './selected-key-words-my-suffix.service';

@Component({
    selector: 'jhi-selected-key-words-my-suffix-dialog',
    templateUrl: './selected-key-words-my-suffix-dialog.component.html'
})
export class SelectedKeyWordsMySuffixDialogComponent implements OnInit {

    selectedKeyWords: SelectedKeyWordsMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private selectedKeyWordsService: SelectedKeyWordsMySuffixService,
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
        if (this.selectedKeyWords.id !== undefined) {
            this.subscribeToSaveResponse(
                this.selectedKeyWordsService.update(this.selectedKeyWords));
        } else {
            this.subscribeToSaveResponse(
                this.selectedKeyWordsService.create(this.selectedKeyWords));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SelectedKeyWordsMySuffix>>) {
        result.subscribe((res: HttpResponse<SelectedKeyWordsMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SelectedKeyWordsMySuffix) {
        this.eventManager.broadcast({ name: 'selectedKeyWordsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-selected-key-words-my-suffix-popup',
    template: ''
})
export class SelectedKeyWordsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private selectedKeyWordsPopupService: SelectedKeyWordsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.selectedKeyWordsPopupService
                    .open(SelectedKeyWordsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.selectedKeyWordsPopupService
                    .open(SelectedKeyWordsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
