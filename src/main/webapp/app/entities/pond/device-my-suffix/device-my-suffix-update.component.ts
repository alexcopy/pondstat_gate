import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDeviceMySuffix } from 'app/shared/model/pond/device-my-suffix.model';
import { DeviceMySuffixService } from './device-my-suffix.service';

@Component({
    selector: 'jhi-device-my-suffix-update',
    templateUrl: './device-my-suffix-update.component.html'
})
export class DeviceMySuffixUpdateComponent implements OnInit {
    private _device: IDeviceMySuffix;
    isSaving: boolean;

    constructor(private deviceService: DeviceMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ device }) => {
            this.device = device;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.device.id !== undefined) {
            this.subscribeToSaveResponse(this.deviceService.update(this.device));
        } else {
            this.subscribeToSaveResponse(this.deviceService.create(this.device));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDeviceMySuffix>>) {
        result.subscribe((res: HttpResponse<IDeviceMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get device() {
        return this._device;
    }

    set device(device: IDeviceMySuffix) {
        this._device = device;
    }
}
