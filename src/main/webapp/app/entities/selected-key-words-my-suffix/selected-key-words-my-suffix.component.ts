import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SelectedKeyWordsMySuffix } from './selected-key-words-my-suffix.model';
import { SelectedKeyWordsMySuffixService } from './selected-key-words-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-selected-key-words-my-suffix',
    templateUrl: './selected-key-words-my-suffix.component.html'
})
export class SelectedKeyWordsMySuffixComponent implements OnInit, OnDestroy {
selectedKeyWords: SelectedKeyWordsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private selectedKeyWordsService: SelectedKeyWordsMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.selectedKeyWordsService.query().subscribe(
            (res: HttpResponse<SelectedKeyWordsMySuffix[]>) => {
                this.selectedKeyWords = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSelectedKeyWords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SelectedKeyWordsMySuffix) {
        return item.id;
    }
    registerChangeInSelectedKeyWords() {
        this.eventSubscriber = this.eventManager.subscribe('selectedKeyWordsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
