import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';

@Component({
    selector: 'jhi-water-change-my-suffix-detail',
    templateUrl: './water-change-my-suffix-detail.component.html'
})
export class WaterChangeMySuffixDetailComponent implements OnInit {
    waterChange: IWaterChangeMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ waterChange }) => {
            this.waterChange = waterChange;
        });
    }

    previousState() {
        window.history.back();
    }
}
