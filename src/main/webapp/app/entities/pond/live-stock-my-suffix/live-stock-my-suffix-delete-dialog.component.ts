import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILiveStockMySuffix } from 'app/shared/model/pond/live-stock-my-suffix.model';
import { LiveStockMySuffixService } from './live-stock-my-suffix.service';

@Component({
    selector: 'jhi-live-stock-my-suffix-delete-dialog',
    templateUrl: './live-stock-my-suffix-delete-dialog.component.html'
})
export class LiveStockMySuffixDeleteDialogComponent {
    liveStock: ILiveStockMySuffix;

    constructor(
        private liveStockService: LiveStockMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.liveStockService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'liveStockListModification',
                content: 'Deleted an liveStock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-live-stock-my-suffix-delete-popup',
    template: ''
})
export class LiveStockMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ liveStock }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LiveStockMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.liveStock = liveStock;
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
