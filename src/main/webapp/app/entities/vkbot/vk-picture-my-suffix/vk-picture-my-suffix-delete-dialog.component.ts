import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';
import { VkPictureMySuffixService } from './vk-picture-my-suffix.service';

@Component({
    selector: 'jhi-vk-picture-my-suffix-delete-dialog',
    templateUrl: './vk-picture-my-suffix-delete-dialog.component.html'
})
export class VkPictureMySuffixDeleteDialogComponent {
    vkPicture: IVkPictureMySuffix;

    constructor(
        private vkPictureService: VkPictureMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vkPictureService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'vkPictureListModification',
                content: 'Deleted an vkPicture'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vk-picture-my-suffix-delete-popup',
    template: ''
})
export class VkPictureMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vkPicture }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VkPictureMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.vkPicture = vkPicture;
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
