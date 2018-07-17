import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';
import { PictureRecognitionMySuffixService } from './picture-recognition-my-suffix.service';

@Component({
    selector: 'jhi-picture-recognition-my-suffix-delete-dialog',
    templateUrl: './picture-recognition-my-suffix-delete-dialog.component.html'
})
export class PictureRecognitionMySuffixDeleteDialogComponent {
    pictureRecognition: IPictureRecognitionMySuffix;

    constructor(
        private pictureRecognitionService: PictureRecognitionMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pictureRecognitionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pictureRecognitionListModification',
                content: 'Deleted an pictureRecognition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-picture-recognition-my-suffix-delete-popup',
    template: ''
})
export class PictureRecognitionMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pictureRecognition }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PictureRecognitionMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pictureRecognition = pictureRecognition;
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
