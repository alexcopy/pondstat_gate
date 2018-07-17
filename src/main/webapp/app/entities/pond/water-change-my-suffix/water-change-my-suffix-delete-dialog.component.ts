import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';
import { WaterChangeMySuffixService } from './water-change-my-suffix.service';

@Component({
    selector: 'jhi-water-change-my-suffix-delete-dialog',
    templateUrl: './water-change-my-suffix-delete-dialog.component.html'
})
export class WaterChangeMySuffixDeleteDialogComponent {
    waterChange: IWaterChangeMySuffix;

    constructor(
        private waterChangeService: WaterChangeMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.waterChangeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'waterChangeListModification',
                content: 'Deleted an waterChange'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-water-change-my-suffix-delete-popup',
    template: ''
})
export class WaterChangeMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ waterChange }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WaterChangeMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.waterChange = waterChange;
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
