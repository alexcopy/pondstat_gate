import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';
import { SelectedKeyWordsMySuffixService } from './selected-key-words-my-suffix.service';

@Component({
    selector: 'jhi-selected-key-words-my-suffix-delete-dialog',
    templateUrl: './selected-key-words-my-suffix-delete-dialog.component.html'
})
export class SelectedKeyWordsMySuffixDeleteDialogComponent {
    selectedKeyWords: ISelectedKeyWordsMySuffix;

    constructor(
        private selectedKeyWordsService: SelectedKeyWordsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.selectedKeyWordsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'selectedKeyWordsListModification',
                content: 'Deleted an selectedKeyWords'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-selected-key-words-my-suffix-delete-popup',
    template: ''
})
export class SelectedKeyWordsMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ selectedKeyWords }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SelectedKeyWordsMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.selectedKeyWords = selectedKeyWords;
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
