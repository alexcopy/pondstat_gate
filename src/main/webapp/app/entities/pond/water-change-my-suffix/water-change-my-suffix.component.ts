import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';
import { Principal } from 'app/core';
import { WaterChangeMySuffixService } from './water-change-my-suffix.service';

@Component({
    selector: 'jhi-water-change-my-suffix',
    templateUrl: './water-change-my-suffix.component.html'
})
export class WaterChangeMySuffixComponent implements OnInit, OnDestroy {
    waterChanges: IWaterChangeMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private waterChangeService: WaterChangeMySuffixService,
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
            this.waterChangeService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IWaterChangeMySuffix[]>) => (this.waterChanges = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.waterChangeService.query().subscribe(
            (res: HttpResponse<IWaterChangeMySuffix[]>) => {
                this.waterChanges = res.body;
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
        this.registerChangeInWaterChanges();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWaterChangeMySuffix) {
        return item.id;
    }

    registerChangeInWaterChanges() {
        this.eventSubscriber = this.eventManager.subscribe('waterChangeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
