import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { VkGroupMySuffix } from './vk-group-my-suffix.model';
import { VkGroupMySuffixService } from './vk-group-my-suffix.service';

@Injectable()
export class VkGroupMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private vkGroupService: VkGroupMySuffixService

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
                this.vkGroupService.find(id)
                    .subscribe((vkGroupResponse: HttpResponse<VkGroupMySuffix>) => {
                        const vkGroup: VkGroupMySuffix = vkGroupResponse.body;
                        this.ngbModalRef = this.vkGroupModalRef(component, vkGroup);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.vkGroupModalRef(component, new VkGroupMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    vkGroupModalRef(component: Component, vkGroup: VkGroupMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vkGroup = vkGroup;
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
