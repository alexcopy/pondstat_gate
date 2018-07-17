import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITempMeterMySuffix } from 'app/shared/model/pond/temp-meter-my-suffix.model';

@Component({
    selector: 'jhi-temp-meter-my-suffix-detail',
    templateUrl: './temp-meter-my-suffix-detail.component.html'
})
export class TempMeterMySuffixDetailComponent implements OnInit {
    tempMeter: ITempMeterMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tempMeter }) => {
            this.tempMeter = tempMeter;
        });
    }

    previousState() {
        window.history.back();
    }
}
