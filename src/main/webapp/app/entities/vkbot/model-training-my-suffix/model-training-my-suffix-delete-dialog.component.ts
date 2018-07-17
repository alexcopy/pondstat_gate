import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';
import { ModelTrainingMySuffixService } from './model-training-my-suffix.service';

@Component({
    selector: 'jhi-model-training-my-suffix-delete-dialog',
    templateUrl: './model-training-my-suffix-delete-dialog.component.html'
})
export class ModelTrainingMySuffixDeleteDialogComponent {
    modelTraining: IModelTrainingMySuffix;

    constructor(
        private modelTrainingService: ModelTrainingMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modelTrainingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'modelTrainingListModification',
                content: 'Deleted an modelTraining'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-model-training-my-suffix-delete-popup',
    template: ''
})
export class ModelTrainingMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ modelTraining }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ModelTrainingMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.modelTraining = modelTraining;
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
