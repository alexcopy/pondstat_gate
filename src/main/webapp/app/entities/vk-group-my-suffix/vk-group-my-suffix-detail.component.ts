import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VkGroupMySuffix } from './vk-group-my-suffix.model';
import { VkGroupMySuffixService } from './vk-group-my-suffix.service';

@Component({
    selector: 'jhi-vk-group-my-suffix-detail',
    templateUrl: './vk-group-my-suffix-detail.component.html'
})
export class VkGroupMySuffixDetailComponent implements OnInit, OnDestroy {

    vkGroup: VkGroupMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vkGroupService: VkGroupMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVkGroups();
    }

    load(id) {
        this.vkGroupService.find(id)
            .subscribe((vkGroupResponse: HttpResponse<VkGroupMySuffix>) => {
                this.vkGroup = vkGroupResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVkGroups() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vkGroupListModification',
            (response) => this.load(this.vkGroup.id)
        );
    }
}
