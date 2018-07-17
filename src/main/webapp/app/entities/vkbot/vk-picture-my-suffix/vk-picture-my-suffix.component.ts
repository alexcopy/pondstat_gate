import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';
import { Principal } from 'app/core';
import { VkPictureMySuffixService } from './vk-picture-my-suffix.service';

@Component({
    selector: 'jhi-vk-picture-my-suffix',
    templateUrl: './vk-picture-my-suffix.component.html'
})
export class VkPictureMySuffixComponent implements OnInit, OnDestroy {
    vkPictures: IVkPictureMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private vkPictureService: VkPictureMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.vkPictureService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IVkPictureMySuffix[]>) => (this.vkPictures = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.vkPictureService.query().subscribe(
            (res: HttpResponse<IVkPictureMySuffix[]>) => {
                this.vkPictures = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVkPictures();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVkPictureMySuffix) {
        return item.id;
    }

    registerChangeInVkPictures() {
        this.eventSubscriber = this.eventManager.subscribe('vkPictureListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
