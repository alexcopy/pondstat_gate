import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SelectedKeyWordsMySuffix } from './selected-key-words-my-suffix.model';
import { SelectedKeyWordsMySuffixService } from './selected-key-words-my-suffix.service';

@Injectable()
export class SelectedKeyWordsMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private selectedKeyWordsService: SelectedKeyWordsMySuffixService

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
                this.selectedKeyWordsService.find(id)
                    .subscribe((selectedKeyWordsResponse: HttpResponse<SelectedKeyWordsMySuffix>) => {
                        const selectedKeyWords: SelectedKeyWordsMySuffix = selectedKeyWordsResponse.body;
                        this.ngbModalRef = this.selectedKeyWordsModalRef(component, selectedKeyWords);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.selectedKeyWordsModalRef(component, new SelectedKeyWordsMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    selectedKeyWordsModalRef(component: Component, selectedKeyWords: SelectedKeyWordsMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.selectedKeyWords = selectedKeyWords;
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
