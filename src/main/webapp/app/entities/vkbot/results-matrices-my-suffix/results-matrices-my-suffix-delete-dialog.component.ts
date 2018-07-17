import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';
import { ResultsMatricesMySuffixService } from './results-matrices-my-suffix.service';

@Component({
    selector: 'jhi-results-matrices-my-suffix-delete-dialog',
    templateUrl: './results-matrices-my-suffix-delete-dialog.component.html'
})
export class ResultsMatricesMySuffixDeleteDialogComponent {
    resultsMatrices: IResultsMatricesMySuffix;

    constructor(
        private resultsMatricesService: ResultsMatricesMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resultsMatricesService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'resultsMatricesListModification',
                content: 'Deleted an resultsMatrices'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-results-matrices-my-suffix-delete-popup',
    template: ''
})
export class ResultsMatricesMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ resultsMatrices }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ResultsMatricesMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.resultsMatrices = resultsMatrices;
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
