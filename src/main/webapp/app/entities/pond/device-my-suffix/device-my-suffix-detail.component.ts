import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeviceMySuffix } from 'app/shared/model/pond/device-my-suffix.model';

@Component({
    selector: 'jhi-device-my-suffix-detail',
    templateUrl: './device-my-suffix-detail.component.html'
})
export class DeviceMySuffixDetailComponent implements OnInit {
    device: IDeviceMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ device }) => {
            this.device = device;
        });
    }

    previousState() {
        window.history.back();
    }
}
