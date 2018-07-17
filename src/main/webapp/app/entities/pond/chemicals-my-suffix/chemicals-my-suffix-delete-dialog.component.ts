import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChemicalsMySuffix } from 'app/shared/model/pond/chemicals-my-suffix.model';
import { ChemicalsMySuffixService } from './chemicals-my-suffix.service';

@Component({
    selector: 'jhi-chemicals-my-suffix-delete-dialog',
    templateUrl: './chemicals-my-suffix-delete-dialog.component.html'
})
export class ChemicalsMySuffixDeleteDialogComponent {
    chemicals: IChemicalsMySuffix;

    constructor(
        private chemicalsService: ChemicalsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chemicalsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chemicalsListModification',
                content: 'Deleted an chemicals'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chemicals-my-suffix-delete-popup',
    template: ''
})
export class ChemicalsMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ chemicals }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ChemicalsMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.chemicals = chemicals;
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
