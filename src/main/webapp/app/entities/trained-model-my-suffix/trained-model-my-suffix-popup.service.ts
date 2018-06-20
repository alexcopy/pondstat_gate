import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TrainedModelMySuffix } from './trained-model-my-suffix.model';
import { TrainedModelMySuffixService } from './trained-model-my-suffix.service';

@Injectable()
export class TrainedModelMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private trainedModelService: TrainedModelMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.trainedModelService.find(id)
                    .subscribe((trainedModelResponse: HttpResponse<TrainedModelMySuffix>) => {
                        const trainedModel: TrainedModelMySuffix = trainedModelResponse.body;
                        this.ngbModalRef = this.trainedModelModalRef(component, trainedModel);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.trainedModelModalRef(component, new TrainedModelMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    trainedModelModalRef(component: Component, trainedModel: TrainedModelMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.trainedModel = trainedModel;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
