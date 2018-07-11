import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SelectedKeyWordsMySuffix } from './selected-key-words-my-suffix.model';
import { SelectedKeyWordsMySuffixPopupService } from './selected-key-words-my-suffix-popup.service';
import { SelectedKeyWordsMySuffixService } from './selected-key-words-my-suffix.service';

@Component({
    selector: 'jhi-selected-key-words-my-suffix-delete-dialog',
    templateUrl: './selected-key-words-my-suffix-delete-dialog.component.html'
})
export class SelectedKeyWordsMySuffixDeleteDialogComponent {

    selectedKeyWords: SelectedKeyWordsMySuffix;

    constructor(
        private selectedKeyWordsService: SelectedKeyWordsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.selectedKeyWordsService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private selectedKeyWordsPopupService: SelectedKeyWordsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.selectedKeyWordsPopupService
                .open(SelectedKeyWordsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
