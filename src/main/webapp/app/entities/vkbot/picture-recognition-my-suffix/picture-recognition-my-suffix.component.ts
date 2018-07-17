import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';
import { Principal } from 'app/core';
import { PictureRecognitionMySuffixService } from './picture-recognition-my-suffix.service';

@Component({
    selector: 'jhi-picture-recognition-my-suffix',
    templateUrl: './picture-recognition-my-suffix.component.html'
})
export class PictureRecognitionMySuffixComponent implements OnInit, OnDestroy {
    pictureRecognitions: IPictureRecognitionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pictureRecognitionService: PictureRecognitionMySuffixService,
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
            this.pictureRecognitionService
                .search({
                    query: this.currentSearch
                })
                .subscribe(
                    (res: HttpResponse<IPictureRecognitionMySuffix[]>) => (this.pictureRecognitions = res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.pictureRecognitionService.query().subscribe(
            (res: HttpResponse<IPictureRecognitionMySuffix[]>) => {
                this.pictureRecognitions = res.body;
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
        this.registerChangeInPictureRecognitions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPictureRecognitionMySuffix) {
        return item.id;
    }

    registerChangeInPictureRecognitions() {
        this.eventSubscriber = this.eventManager.subscribe('pictureRecognitionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
