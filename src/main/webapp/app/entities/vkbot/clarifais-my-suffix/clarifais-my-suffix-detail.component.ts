import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClarifaisMySuffix } from 'app/shared/model/vkbot/clarifais-my-suffix.model';

@Component({
    selector: 'jhi-clarifais-my-suffix-detail',
    templateUrl: './clarifais-my-suffix-detail.component.html'
})
export class ClarifaisMySuffixDetailComponent implements OnInit {
    clarifais: IClarifaisMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clarifais }) => {
            this.clarifais = clarifais;
        });
    }

    previousState() {
        window.history.back();
    }
}
