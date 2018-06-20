import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TrainedModelMySuffix } from './trained-model-my-suffix.model';
import { TrainedModelMySuffixService } from './trained-model-my-suffix.service';

@Component({
    selector: 'jhi-trained-model-my-suffix-detail',
    templateUrl: './trained-model-my-suffix-detail.component.html'
})
export class TrainedModelMySuffixDetailComponent implements OnInit, OnDestroy {

    trainedModel: TrainedModelMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private trainedModelService: TrainedModelMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTrainedModels();
    }

    load(id) {
        this.trainedModelService.find(id)
            .subscribe((trainedModelResponse: HttpResponse<TrainedModelMySuffix>) => {
                this.trainedModel = trainedModelResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTrainedModels() {
        this.eventSubscriber = this.eventManager.subscribe(
            'trainedModelListModification',
            (response) => this.load(this.trainedModel.id)
        );
    }
}
