import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VkGroupMySuffix } from './vk-group-my-suffix.model';
import { VkGroupMySuffixPopupService } from './vk-group-my-suffix-popup.service';
import { VkGroupMySuffixService } from './vk-group-my-suffix.service';

@Component({
    selector: 'jhi-vk-group-my-suffix-delete-dialog',
    templateUrl: './vk-group-my-suffix-delete-dialog.component.html'
})
export class VkGroupMySuffixDeleteDialogComponent {

    vkGroup: VkGroupMySuffix;

    constructor(
        private vkGroupService: VkGroupMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vkGroupService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vkGroupListModification',
                content: 'Deleted an vkGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vk-group-my-suffix-delete-popup',
    template: ''
})
export class VkGroupMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vkGroupPopupService: VkGroupMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vkGroupPopupService
                .open(VkGroupMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
