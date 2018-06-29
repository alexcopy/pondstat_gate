import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ClarifaisMySuffix } from './clarifais-my-suffix.model';
import { ClarifaisMySuffixService } from './clarifais-my-suffix.service';

@Injectable()
export class ClarifaisMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private clarifaisService: ClarifaisMySuffixService

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
                this.clarifaisService.find(id)
                    .subscribe((clarifaisResponse: HttpResponse<ClarifaisMySuffix>) => {
                        const clarifais: ClarifaisMySuffix = clarifaisResponse.body;
                        this.ngbModalRef = this.clarifaisModalRef(component, clarifais);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.clarifaisModalRef(component, new ClarifaisMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    clarifaisModalRef(component: Component, clarifais: ClarifaisMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.clarifais = clarifais;
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
