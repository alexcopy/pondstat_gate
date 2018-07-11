import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SelectedKeyWordsMySuffix } from './selected-key-words-my-suffix.model';
import { SelectedKeyWordsMySuffixService } from './selected-key-words-my-suffix.service';

@Component({
    selector: 'jhi-selected-key-words-my-suffix-detail',
    templateUrl: './selected-key-words-my-suffix-detail.component.html'
})
export class SelectedKeyWordsMySuffixDetailComponent implements OnInit, OnDestroy {

    selectedKeyWords: SelectedKeyWordsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private selectedKeyWordsService: SelectedKeyWordsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSelectedKeyWords();
    }

    load(id) {
        this.selectedKeyWordsService.find(id)
            .subscribe((selectedKeyWordsResponse: HttpResponse<SelectedKeyWordsMySuffix>) => {
                this.selectedKeyWords = selectedKeyWordsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSelectedKeyWords() {
        this.eventSubscriber = this.eventManager.subscribe(
            'selectedKeyWordsListModification',
            (response) => this.load(this.selectedKeyWords.id)
        );
    }
}
