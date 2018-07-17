import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeterReadingMySuffix } from 'app/shared/model/pond/meter-reading-my-suffix.model';

@Component({
    selector: 'jhi-meter-reading-my-suffix-detail',
    templateUrl: './meter-reading-my-suffix-detail.component.html'
})
export class MeterReadingMySuffixDetailComponent implements OnInit {
    meterReading: IMeterReadingMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meterReading }) => {
            this.meterReading = meterReading;
        });
    }

    previousState() {
        window.history.back();
    }
}
