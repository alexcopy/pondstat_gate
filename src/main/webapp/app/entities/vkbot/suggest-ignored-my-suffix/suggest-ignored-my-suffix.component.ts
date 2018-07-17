import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';
import { Principal } from 'app/core';
import { SuggestIgnoredMySuffixService } from './suggest-ignored-my-suffix.service';

@Component({
    selector: 'jhi-suggest-ignored-my-suffix',
    templateUrl: './suggest-ignored-my-suffix.component.html'
})
export class SuggestIgnoredMySuffixComponent implements OnInit, OnDestroy {
    suggestIgnoreds: ISuggestIgnoredMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private suggestIgnoredService: SuggestIgnoredMySuffixService,
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
            this.suggestIgnoredService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ISuggestIgnoredMySuffix[]>) => (this.suggestIgnoreds = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.suggestIgnoredService.query().subscribe(
            (res: HttpResponse<ISuggestIgnoredMySuffix[]>) => {
                this.suggestIgnoreds = res.body;
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
        this.registerChangeInSuggestIgnoreds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISuggestIgnoredMySuffix) {
        return item.id;
    }

    registerChangeInSuggestIgnoreds() {
        this.eventSubscriber = this.eventManager.subscribe('suggestIgnoredListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
