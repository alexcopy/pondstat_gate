import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';
import { VkUserMySuffixService } from './vk-user-my-suffix.service';

@Component({
    selector: 'jhi-vk-user-my-suffix-delete-dialog',
    templateUrl: './vk-user-my-suffix-delete-dialog.component.html'
})
export class VkUserMySuffixDeleteDialogComponent {
    vkUser: IVkUserMySuffix;

    constructor(private vkUserService: VkUserMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vkUserService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vkUserListModification',
                content: 'Deleted an vkUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vk-user-my-suffix-delete-popup',
    template: ''
})
export class VkUserMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vkUser }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VkUserMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.vkUser = vkUser;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
