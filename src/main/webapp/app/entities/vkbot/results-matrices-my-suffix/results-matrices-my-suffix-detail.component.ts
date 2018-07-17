import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';

@Component({
    selector: 'jhi-results-matrices-my-suffix-detail',
    templateUrl: './results-matrices-my-suffix-detail.component.html'
})
export class ResultsMatricesMySuffixDetailComponent implements OnInit {
    resultsMatrices: IResultsMatricesMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ resultsMatrices }) => {
            this.resultsMatrices = resultsMatrices;
        });
    }

    previousState() {
        window.history.back();
    }
}
