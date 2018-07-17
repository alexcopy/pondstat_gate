import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrainedModelMySuffix } from 'app/shared/model/vkbot/trained-model-my-suffix.model';

@Component({
    selector: 'jhi-trained-model-my-suffix-detail',
    templateUrl: './trained-model-my-suffix-detail.component.html'
})
export class TrainedModelMySuffixDetailComponent implements OnInit {
    trainedModel: ITrainedModelMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ trainedModel }) => {
            this.trainedModel = trainedModel;
        });
    }

    previousState() {
        window.history.back();
    }
}
