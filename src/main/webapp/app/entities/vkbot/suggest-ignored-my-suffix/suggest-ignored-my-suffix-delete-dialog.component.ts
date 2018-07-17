import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';
import { SuggestIgnoredMySuffixService } from './suggest-ignored-my-suffix.service';

@Component({
    selector: 'jhi-suggest-ignored-my-suffix-delete-dialog',
    templateUrl: './suggest-ignored-my-suffix-delete-dialog.component.html'
})
export class SuggestIgnoredMySuffixDeleteDialogComponent {
    suggestIgnored: ISuggestIgnoredMySuffix;

    constructor(
        private suggestIgnoredService: SuggestIgnoredMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.suggestIgnoredService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'suggestIgnoredListModification',
                content: 'Deleted an suggestIgnored'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-suggest-ignored-my-suffix-delete-popup',
    template: ''
})
export class SuggestIgnoredMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ suggestIgnored }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SuggestIgnoredMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.suggestIgnored = suggestIgnored;
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
