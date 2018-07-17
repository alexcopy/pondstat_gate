import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';
import { Principal } from 'app/core';
import { TankMySuffixService } from './tank-my-suffix.service';

@Component({
    selector: 'jhi-tank-my-suffix',
    templateUrl: './tank-my-suffix.component.html'
})
export class TankMySuffixComponent implements OnInit, OnDestroy {
    tanks: ITankMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tankService: TankMySuffixService,
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
            this.tankService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ITankMySuffix[]>) => (this.tanks = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.tankService.query().subscribe(
            (res: HttpResponse<ITankMySuffix[]>) => {
                this.tanks = res.body;
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
        this.registerChangeInTanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITankMySuffix) {
        return item.id;
    }

    registerChangeInTanks() {
        this.eventSubscriber = this.eventManager.subscribe('tankListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
