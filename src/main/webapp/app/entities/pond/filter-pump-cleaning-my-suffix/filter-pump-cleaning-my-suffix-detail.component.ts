import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFilterPumpCleaningMySuffix } from 'app/shared/model/pond/filter-pump-cleaning-my-suffix.model';

@Component({
    selector: 'jhi-filter-pump-cleaning-my-suffix-detail',
    templateUrl: './filter-pump-cleaning-my-suffix-detail.component.html'
})
export class FilterPumpCleaningMySuffixDetailComponent implements OnInit {
    filterPumpCleaning: IFilterPumpCleaningMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ filterPumpCleaning }) => {
            this.filterPumpCleaning = filterPumpCleaning;
        });
    }

    previousState() {
        window.history.back();
    }
}
