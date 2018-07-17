import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeviceMySuffix } from 'app/shared/model/pond/device-my-suffix.model';
import { DeviceMySuffixService } from './device-my-suffix.service';

@Component({
    selector: 'jhi-device-my-suffix-delete-dialog',
    templateUrl: './device-my-suffix-delete-dialog.component.html'
})
export class DeviceMySuffixDeleteDialogComponent {
    device: IDeviceMySuffix;

    constructor(private deviceService: DeviceMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deviceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deviceListModification',
                content: 'Deleted an device'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-device-my-suffix-delete-popup',
    template: ''
})
export class DeviceMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ device }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeviceMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.device = device;
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
