import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClarifaisMySuffix } from 'app/shared/model/vkbot/clarifais-my-suffix.model';
import { ClarifaisMySuffixService } from './clarifais-my-suffix.service';

@Component({
    selector: 'jhi-clarifais-my-suffix-delete-dialog',
    templateUrl: './clarifais-my-suffix-delete-dialog.component.html'
})
export class ClarifaisMySuffixDeleteDialogComponent {
    clarifais: IClarifaisMySuffix;

    constructor(
        private clarifaisService: ClarifaisMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clarifaisService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'clarifaisListModification',
                content: 'Deleted an clarifais'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-clarifais-my-suffix-delete-popup',
    template: ''
})
export class ClarifaisMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clarifais }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ClarifaisMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.clarifais = clarifais;
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
