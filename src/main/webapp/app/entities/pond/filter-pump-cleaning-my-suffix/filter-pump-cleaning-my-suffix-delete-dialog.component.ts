import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFilterPumpCleaningMySuffix } from 'app/shared/model/pond/filter-pump-cleaning-my-suffix.model';
import { FilterPumpCleaningMySuffixService } from './filter-pump-cleaning-my-suffix.service';

@Component({
    selector: 'jhi-filter-pump-cleaning-my-suffix-delete-dialog',
    templateUrl: './filter-pump-cleaning-my-suffix-delete-dialog.component.html'
})
export class FilterPumpCleaningMySuffixDeleteDialogComponent {
    filterPumpCleaning: IFilterPumpCleaningMySuffix;

    constructor(
        private filterPumpCleaningService: FilterPumpCleaningMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.filterPumpCleaningService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'filterPumpCleaningListModification',
                content: 'Deleted an filterPumpCleaning'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-filter-pump-cleaning-my-suffix-delete-popup',
    template: ''
})
export class FilterPumpCleaningMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ filterPumpCleaning }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FilterPumpCleaningMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.filterPumpCleaning = filterPumpCleaning;
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
