import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITempMeterMySuffix } from 'app/shared/model/pond/temp-meter-my-suffix.model';
import { TempMeterMySuffixService } from './temp-meter-my-suffix.service';

@Component({
    selector: 'jhi-temp-meter-my-suffix-delete-dialog',
    templateUrl: './temp-meter-my-suffix-delete-dialog.component.html'
})
export class TempMeterMySuffixDeleteDialogComponent {
    tempMeter: ITempMeterMySuffix;

    constructor(
        private tempMeterService: TempMeterMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tempMeterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tempMeterListModification',
                content: 'Deleted an tempMeter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-temp-meter-my-suffix-delete-popup',
    template: ''
})
export class TempMeterMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tempMeter }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TempMeterMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tempMeter = tempMeter;
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
