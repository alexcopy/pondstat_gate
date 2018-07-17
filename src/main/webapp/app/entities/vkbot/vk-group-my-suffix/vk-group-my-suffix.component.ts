import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVkGroupMySuffix } from 'app/shared/model/vkbot/vk-group-my-suffix.model';
import { Principal } from 'app/core';
import { VkGroupMySuffixService } from './vk-group-my-suffix.service';

@Component({
    selector: 'jhi-vk-group-my-suffix',
    templateUrl: './vk-group-my-suffix.component.html'
})
export class VkGroupMySuffixComponent implements OnInit, OnDestroy {
    vkGroups: IVkGroupMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private vkGroupService: VkGroupMySuffixService,
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
            this.vkGroupService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IVkGroupMySuffix[]>) => (this.vkGroups = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.vkGroupService.query().subscribe(
            (res: HttpResponse<IVkGroupMySuffix[]>) => {
                this.vkGroups = res.body;
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
        this.registerChangeInVkGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVkGroupMySuffix) {
        return item.id;
    }

    registerChangeInVkGroups() {
        this.eventSubscriber = this.eventManager.subscribe('vkGroupListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
