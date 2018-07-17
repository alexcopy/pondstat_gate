import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';
import { Principal } from 'app/core';
import { VkUserMySuffixService } from './vk-user-my-suffix.service';

@Component({
    selector: 'jhi-vk-user-my-suffix',
    templateUrl: './vk-user-my-suffix.component.html'
})
export class VkUserMySuffixComponent implements OnInit, OnDestroy {
    vkUsers: IVkUserMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private vkUserService: VkUserMySuffixService,
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
            this.vkUserService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IVkUserMySuffix[]>) => (this.vkUsers = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.vkUserService.query().subscribe(
            (res: HttpResponse<IVkUserMySuffix[]>) => {
                this.vkUsers = res.body;
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
        this.registerChangeInVkUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVkUserMySuffix) {
        return item.id;
    }

    registerChangeInVkUsers() {
        this.eventSubscriber = this.eventManager.subscribe('vkUserListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
