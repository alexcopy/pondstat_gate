import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ResultsMatricesMySuffix } from './results-matrices-my-suffix.model';
import { ResultsMatricesMySuffixService } from './results-matrices-my-suffix.service';

@Injectable()
export class ResultsMatricesMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private resultsMatricesService: ResultsMatricesMySuffixService

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
                this.resultsMatricesService.find(id)
                    .subscribe((resultsMatricesResponse: HttpResponse<ResultsMatricesMySuffix>) => {
                        const resultsMatrices: ResultsMatricesMySuffix = resultsMatricesResponse.body;
                        this.ngbModalRef = this.resultsMatricesModalRef(component, resultsMatrices);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.resultsMatricesModalRef(component, new ResultsMatricesMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    resultsMatricesModalRef(component: Component, resultsMatrices: ResultsMatricesMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resultsMatrices = resultsMatrices;
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
