import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChemicalAnalysisMySuffix } from 'app/shared/model/pond/chemical-analysis-my-suffix.model';

@Component({
    selector: 'jhi-chemical-analysis-my-suffix-detail',
    templateUrl: './chemical-analysis-my-suffix-detail.component.html'
})
export class ChemicalAnalysisMySuffixDetailComponent implements OnInit {
    chemicalAnalysis: IChemicalAnalysisMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ chemicalAnalysis }) => {
            this.chemicalAnalysis = chemicalAnalysis;
        });
    }

    previousState() {
        window.history.back();
    }
}
