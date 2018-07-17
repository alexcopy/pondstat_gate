import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrainedModelMySuffix } from 'app/shared/model/vkbot/trained-model-my-suffix.model';
import { TrainedModelMySuffixService } from './trained-model-my-suffix.service';

@Component({
    selector: 'jhi-trained-model-my-suffix-delete-dialog',
    templateUrl: './trained-model-my-suffix-delete-dialog.component.html'
})
export class TrainedModelMySuffixDeleteDialogComponent {
    trainedModel: ITrainedModelMySuffix;

    constructor(
        private trainedModelService: TrainedModelMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trainedModelService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trainedModel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TrainedModelMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.trainedModel = trainedModel;
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
