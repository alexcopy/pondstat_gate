import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VkGroupMySuffix } from './vk-group-my-suffix.model';
import { VkGroupMySuffixPopupService } from './vk-group-my-suffix-popup.service';
import { VkGroupMySuffixService } from './vk-group-my-suffix.service';

@Component({
    selector: 'jhi-vk-group-my-suffix-dialog',
    templateUrl: './vk-group-my-suffix-dialog.component.html'
})
export class VkGroupMySuffixDialogComponent implements OnInit {

    vkGroup: VkGroupMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private vkGroupService: VkGroupMySuffixService,
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
        if (this.vkGroup.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vkGroupService.update(this.vkGroup));
        } else {
            this.subscribeToSaveResponse(
                this.vkGroupService.create(this.vkGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VkGroupMySuffix>>) {
        result.subscribe((res: HttpResponse<VkGroupMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VkGroupMySuffix) {
        this.eventManager.broadcast({ name: 'vkGroupListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-vk-group-my-suffix-popup',
    template: ''
})
export class VkGroupMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vkGroupPopupService: VkGroupMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vkGroupPopupService
                    .open(VkGroupMySuffixDialogComponent as Component, params['id']);
            } else {
                this.vkGroupPopupService
                    .open(VkGroupMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
