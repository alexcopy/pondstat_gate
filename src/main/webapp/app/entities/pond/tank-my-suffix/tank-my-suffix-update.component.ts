import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';
import { TankMySuffixService } from './tank-my-suffix.service';

@Component({
    selector: 'jhi-tank-my-suffix-update',
    templateUrl: './tank-my-suffix-update.component.html'
})
export class TankMySuffixUpdateComponent implements OnInit {
    private _tank: ITankMySuffix;
    isSaving: boolean;

    constructor(private tankService: TankMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tank }) => {
            this.tank = tank;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tank.id !== undefined) {
            this.subscribeToSaveResponse(this.tankService.update(this.tank));
        } else {
            this.subscribeToSaveResponse(this.tankService.create(this.tank));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITankMySuffix>>) {
        result.subscribe((res: HttpResponse<ITankMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tank() {
        return this._tank;
    }

    set tank(tank: ITankMySuffix) {
        this._tank = tank;
    }
}
