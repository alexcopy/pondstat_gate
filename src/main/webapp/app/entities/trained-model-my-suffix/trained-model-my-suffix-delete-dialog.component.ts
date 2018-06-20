import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TrainedModelMySuffix } from './trained-model-my-suffix.model';
import { TrainedModelMySuffixPopupService } from './trained-model-my-suffix-popup.service';
import { TrainedModelMySuffixService } from './trained-model-my-suffix.service';

@Component({
    selector: 'jhi-trained-model-my-suffix-delete-dialog',
    templateUrl: './trained-model-my-suffix-delete-dialog.component.html'
})
export class TrainedModelMySuffixDeleteDialogComponent {

    trainedModel: TrainedModelMySuffix;

    constructor(
        private trainedModelService: TrainedModelMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trainedModelService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'trainedModelListModification',
                content: 'Deleted an trainedModel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-trained-model-my-suffix-delete-popup',
    template: ''
})
export class TrainedModelMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trainedModelPopupService: TrainedModelMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.trainedModelPopupService
                .open(TrainedModelMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
