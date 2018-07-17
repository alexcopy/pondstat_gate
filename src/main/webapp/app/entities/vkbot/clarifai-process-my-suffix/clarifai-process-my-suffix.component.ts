import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';
import { Principal } from 'app/core';
import { ClarifaiProcessMySuffixService } from './clarifai-process-my-suffix.service';

@Component({
    selector: 'jhi-clarifai-process-my-suffix',
    templateUrl: './clarifai-process-my-suffix.component.html'
})
export class ClarifaiProcessMySuffixComponent implements OnInit, OnDestroy {
    clarifaiProcesses: IClarifaiProcessMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private clarifaiProcessService: ClarifaiProcessMySuffixService,
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
            this.clarifaiProcessService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IClarifaiProcessMySuffix[]>) => (this.clarifaiProcesses = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.clarifaiProcessService.query().subscribe(
            (res: HttpResponse<IClarifaiProcessMySuffix[]>) => {
                this.clarifaiProcesses = res.body;
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
        this.registerChangeInClarifaiProcesses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClarifaiProcessMySuffix) {
        return item.id;
    }

    registerChangeInClarifaiProcesses() {
        this.eventSubscriber = this.eventManager.subscribe('clarifaiProcessListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
