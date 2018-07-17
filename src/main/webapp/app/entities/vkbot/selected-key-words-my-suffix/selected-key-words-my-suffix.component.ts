import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';
import { Principal } from 'app/core';
import { SelectedKeyWordsMySuffixService } from './selected-key-words-my-suffix.service';

@Component({
    selector: 'jhi-selected-key-words-my-suffix',
    templateUrl: './selected-key-words-my-suffix.component.html'
})
export class SelectedKeyWordsMySuffixComponent implements OnInit, OnDestroy {
    selectedKeyWords: ISelectedKeyWordsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private selectedKeyWordsService: SelectedKeyWordsMySuffixService,
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
            this.selectedKeyWordsService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<ISelectedKeyWordsMySuffix[]>) => (this.selectedKeyWords = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.selectedKeyWordsService.query().subscribe(
            (res: HttpResponse<ISelectedKeyWordsMySuffix[]>) => {
                this.selectedKeyWords = res.body;
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
        this.registerChangeInSelectedKeyWords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISelectedKeyWordsMySuffix) {
        return item.id;
    }

    registerChangeInSelectedKeyWords() {
        this.eventSubscriber = this.eventManager.subscribe('selectedKeyWordsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
