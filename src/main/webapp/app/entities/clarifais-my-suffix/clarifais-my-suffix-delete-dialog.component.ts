import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClarifaisMySuffix } from './clarifais-my-suffix.model';
import { ClarifaisMySuffixPopupService } from './clarifais-my-suffix-popup.service';
import { ClarifaisMySuffixService } from './clarifais-my-suffix.service';

@Component({
    selector: 'jhi-clarifais-my-suffix-delete-dialog',
    templateUrl: './clarifais-my-suffix-delete-dialog.component.html'
})
export class ClarifaisMySuffixDeleteDialogComponent {

    clarifais: ClarifaisMySuffix;

    constructor(
        private clarifaisService: ClarifaisMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clarifaisService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clarifaisListModification',
                content: 'Deleted an clarifais'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-clarifais-my-suffix-delete-popup',
    template: ''
})
export class ClarifaisMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clarifaisPopupService: ClarifaisMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clarifaisPopupService
                .open(ClarifaisMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
