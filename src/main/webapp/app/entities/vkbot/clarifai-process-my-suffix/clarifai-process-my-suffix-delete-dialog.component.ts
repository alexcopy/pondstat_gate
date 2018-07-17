import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';
import { ClarifaiProcessMySuffixService } from './clarifai-process-my-suffix.service';

@Component({
    selector: 'jhi-clarifai-process-my-suffix-delete-dialog',
    templateUrl: './clarifai-process-my-suffix-delete-dialog.component.html'
})
export class ClarifaiProcessMySuffixDeleteDialogComponent {
    clarifaiProcess: IClarifaiProcessMySuffix;

    constructor(
        private clarifaiProcessService: ClarifaiProcessMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clarifaiProcessService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'clarifaiProcessListModification',
                content: 'Deleted an clarifaiProcess'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-clarifai-process-my-suffix-delete-popup',
    template: ''
})
export class ClarifaiProcessMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clarifaiProcess }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ClarifaiProcessMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.clarifaiProcess = clarifaiProcess;
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
