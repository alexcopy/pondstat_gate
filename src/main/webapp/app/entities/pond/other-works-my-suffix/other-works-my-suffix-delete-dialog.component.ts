import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOtherWorksMySuffix } from 'app/shared/model/pond/other-works-my-suffix.model';
import { OtherWorksMySuffixService } from './other-works-my-suffix.service';

@Component({
    selector: 'jhi-other-works-my-suffix-delete-dialog',
    templateUrl: './other-works-my-suffix-delete-dialog.component.html'
})
export class OtherWorksMySuffixDeleteDialogComponent {
    otherWorks: IOtherWorksMySuffix;

    constructor(
        private otherWorksService: OtherWorksMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.otherWorksService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'otherWorksListModification',
                content: 'Deleted an otherWorks'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-other-works-my-suffix-delete-popup',
    template: ''
})
export class OtherWorksMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ otherWorks }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OtherWorksMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.otherWorks = otherWorks;
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
