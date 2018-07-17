import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';

@Component({
    selector: 'jhi-tank-my-suffix-detail',
    templateUrl: './tank-my-suffix-detail.component.html'
})
export class TankMySuffixDetailComponent implements OnInit {
    tank: ITankMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tank }) => {
            this.tank = tank;
        });
    }

    previousState() {
        window.history.back();
    }
}
