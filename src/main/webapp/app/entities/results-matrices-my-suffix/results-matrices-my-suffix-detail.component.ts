import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ResultsMatricesMySuffix } from './results-matrices-my-suffix.model';
import { ResultsMatricesMySuffixService } from './results-matrices-my-suffix.service';

@Component({
    selector: 'jhi-results-matrices-my-suffix-detail',
    templateUrl: './results-matrices-my-suffix-detail.component.html'
})
export class ResultsMatricesMySuffixDetailComponent implements OnInit, OnDestroy {

    resultsMatrices: ResultsMatricesMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resultsMatricesService: ResultsMatricesMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResultsMatrices();
    }

    load(id) {
        this.resultsMatricesService.find(id)
            .subscribe((resultsMatricesResponse: HttpResponse<ResultsMatricesMySuffix>) => {
                this.resultsMatrices = resultsMatricesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResultsMatrices() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resultsMatricesListModification',
            (response) => this.load(this.resultsMatrices.id)
        );
    }
}
