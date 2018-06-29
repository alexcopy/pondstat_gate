import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VkGroupMySuffix } from './vk-group-my-suffix.model';
import { VkGroupMySuffixService } from './vk-group-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-vk-group-my-suffix',
    templateUrl: './vk-group-my-suffix.component.html'
})
export class VkGroupMySuffixComponent implements OnInit, OnDestroy {
vkGroups: VkGroupMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vkGroupService: VkGroupMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.vkGroupService.query().subscribe(
            (res: HttpResponse<VkGroupMySuffix[]>) => {
                this.vkGroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVkGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VkGroupMySuffix) {
        return item.id;
    }
    registerChangeInVkGroups() {
        this.eventSubscriber = this.eventManager.subscribe('vkGroupListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
