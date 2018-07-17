import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';
import { TankMySuffixService } from './tank-my-suffix.service';

@Component({
    selector: 'jhi-tank-my-suffix-delete-dialog',
    templateUrl: './tank-my-suffix-delete-dialog.component.html'
})
export class TankMySuffixDeleteDialogComponent {
    tank: ITankMySuffix;

    constructor(private tankService: TankMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tankListModification',
                content: 'Deleted an tank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tank-my-suffix-delete-popup',
    template: ''
})
export class TankMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tank }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TankMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tank = tank;
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
