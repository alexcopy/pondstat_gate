import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';
import { Principal } from 'app/core';
import { ResultsMatricesMySuffixService } from './results-matrices-my-suffix.service';

@Component({
    selector: 'jhi-results-matrices-my-suffix',
    templateUrl: './results-matrices-my-suffix.component.html'
})
export class ResultsMatricesMySuffixComponent implements OnInit, OnDestroy {
    resultsMatrices: IResultsMatricesMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private resultsMatricesService: ResultsMatricesMySuffixService,
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
            this.resultsMatricesService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IResultsMatricesMySuffix[]>) => (this.resultsMatrices = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.resultsMatricesService.query().subscribe(
            (res: HttpResponse<IResultsMatricesMySuffix[]>) => {
                this.resultsMatrices = res.body;
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
        this.registerChangeInResultsMatrices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IResultsMatricesMySuffix) {
        return item.id;
    }

    registerChangeInResultsMatrices() {
        this.eventSubscriber = this.eventManager.subscribe('resultsMatricesListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
