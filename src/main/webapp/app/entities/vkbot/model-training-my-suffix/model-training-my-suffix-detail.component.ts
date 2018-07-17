import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';

@Component({
    selector: 'jhi-model-training-my-suffix-detail',
    templateUrl: './model-training-my-suffix-detail.component.html'
})
export class ModelTrainingMySuffixDetailComponent implements OnInit {
    modelTraining: IModelTrainingMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ modelTraining }) => {
            this.modelTraining = modelTraining;
        });
    }

    previousState() {
        window.history.back();
    }
}
