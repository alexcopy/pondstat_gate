import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';
import { Principal } from 'app/core';
import { ModelTrainingMySuffixService } from './model-training-my-suffix.service';

@Component({
    selector: 'jhi-model-training-my-suffix',
    templateUrl: './model-training-my-suffix.component.html'
})
export class ModelTrainingMySuffixComponent implements OnInit, OnDestroy {
    modelTrainings: IModelTrainingMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private modelTrainingService: ModelTrainingMySuffixService,
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
            this.modelTrainingService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IModelTrainingMySuffix[]>) => (this.modelTrainings = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.modelTrainingService.query().subscribe(
            (res: HttpResponse<IModelTrainingMySuffix[]>) => {
                this.modelTrainings = res.body;
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
        this.registerChangeInModelTrainings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IModelTrainingMySuffix) {
        return item.id;
    }

    registerChangeInModelTrainings() {
        this.eventSubscriber = this.eventManager.subscribe('modelTrainingListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
