import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';

@Component({
    selector: 'jhi-clarifai-process-my-suffix-detail',
    templateUrl: './clarifai-process-my-suffix-detail.component.html'
})
export class ClarifaiProcessMySuffixDetailComponent implements OnInit {
    clarifaiProcess: IClarifaiProcessMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clarifaiProcess }) => {
            this.clarifaiProcess = clarifaiProcess;
        });
    }

    previousState() {
        window.history.back();
    }
}
