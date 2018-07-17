import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeterReadingMySuffix } from 'app/shared/model/pond/meter-reading-my-suffix.model';
import { MeterReadingMySuffixService } from './meter-reading-my-suffix.service';

@Component({
    selector: 'jhi-meter-reading-my-suffix-delete-dialog',
    templateUrl: './meter-reading-my-suffix-delete-dialog.component.html'
})
export class MeterReadingMySuffixDeleteDialogComponent {
    meterReading: IMeterReadingMySuffix;

    constructor(
        private meterReadingService: MeterReadingMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.meterReadingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'meterReadingListModification',
                content: 'Deleted an meterReading'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meter-reading-my-suffix-delete-popup',
    template: ''
})
export class MeterReadingMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meterReading }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MeterReadingMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.meterReading = meterReading;
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
