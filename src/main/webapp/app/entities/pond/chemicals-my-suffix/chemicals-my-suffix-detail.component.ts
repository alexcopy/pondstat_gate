import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChemicalsMySuffix } from 'app/shared/model/pond/chemicals-my-suffix.model';

@Component({
    selector: 'jhi-chemicals-my-suffix-detail',
    templateUrl: './chemicals-my-suffix-detail.component.html'
})
export class ChemicalsMySuffixDetailComponent implements OnInit {
    chemicals: IChemicalsMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ chemicals }) => {
            this.chemicals = chemicals;
        });
    }

    previousState() {
        window.history.back();
    }
}
