import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClarifaisMySuffix } from './clarifais-my-suffix.model';
import { ClarifaisMySuffixService } from './clarifais-my-suffix.service';

@Component({
    selector: 'jhi-clarifais-my-suffix-detail',
    templateUrl: './clarifais-my-suffix-detail.component.html'
})
export class ClarifaisMySuffixDetailComponent implements OnInit, OnDestroy {

    clarifais: ClarifaisMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clarifaisService: ClarifaisMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClarifais();
    }

    load(id) {
        this.clarifaisService.find(id)
            .subscribe((clarifaisResponse: HttpResponse<ClarifaisMySuffix>) => {
                this.clarifais = clarifaisResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClarifais() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clarifaisListModification',
            (response) => this.load(this.clarifais.id)
        );
    }
}
