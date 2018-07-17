import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChemicalAnalysisMySuffix } from 'app/shared/model/pond/chemical-analysis-my-suffix.model';
import { ChemicalAnalysisMySuffixService } from './chemical-analysis-my-suffix.service';

@Component({
    selector: 'jhi-chemical-analysis-my-suffix-delete-dialog',
    templateUrl: './chemical-analysis-my-suffix-delete-dialog.component.html'
})
export class ChemicalAnalysisMySuffixDeleteDialogComponent {
    chemicalAnalysis: IChemicalAnalysisMySuffix;

    constructor(
        private chemicalAnalysisService: ChemicalAnalysisMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chemicalAnalysisService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chemicalAnalysisListModification',
                content: 'Deleted an chemicalAnalysis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chemical-analysis-my-suffix-delete-popup',
    template: ''
})
export class ChemicalAnalysisMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ chemicalAnalysis }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ChemicalAnalysisMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.chemicalAnalysis = chemicalAnalysis;
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
