import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResultsMatricesMySuffix } from './results-matrices-my-suffix.model';
import { ResultsMatricesMySuffixService } from './results-matrices-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-results-matrices-my-suffix',
    templateUrl: './results-matrices-my-suffix.component.html'
})
export class ResultsMatricesMySuffixComponent implements OnInit, OnDestroy {
resultsMatrices: ResultsMatricesMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private resultsMatricesService: ResultsMatricesMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.resultsMatricesService.query().subscribe(
            (res: HttpResponse<ResultsMatricesMySuffix[]>) => {
                this.resultsMatrices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInResultsMatrices();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ResultsMatricesMySuffix) {
        return item.id;
    }
    registerChangeInResultsMatrices() {
        this.eventSubscriber = this.eventManager.subscribe('resultsMatricesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
