import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOtherWorksMySuffix } from 'app/shared/model/pond/other-works-my-suffix.model';
import { Principal } from 'app/core';
import { OtherWorksMySuffixService } from './other-works-my-suffix.service';

@Component({
    selector: 'jhi-other-works-my-suffix',
    templateUrl: './other-works-my-suffix.component.html'
})
export class OtherWorksMySuffixComponent implements OnInit, OnDestroy {
    otherWorks: IOtherWorksMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private otherWorksService: OtherWorksMySuffixService,
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
            this.otherWorksService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IOtherWorksMySuffix[]>) => (this.otherWorks = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.otherWorksService.query().subscribe(
            (res: HttpResponse<IOtherWorksMySuffix[]>) => {
                this.otherWorks = res.body;
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
        this.registerChangeInOtherWorks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOtherWorksMySuffix) {
        return item.id;
    }

    registerChangeInOtherWorks() {
        this.eventSubscriber = this.eventManager.subscribe('otherWorksListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
