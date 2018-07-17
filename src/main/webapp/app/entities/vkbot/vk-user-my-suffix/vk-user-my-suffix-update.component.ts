import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IVkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';
import { VkUserMySuffixService } from './vk-user-my-suffix.service';

@Component({
    selector: 'jhi-vk-user-my-suffix-update',
    templateUrl: './vk-user-my-suffix-update.component.html'
})
export class VkUserMySuffixUpdateComponent implements OnInit {
    private _vkUser: IVkUserMySuffix;
    isSaving: boolean;

    constructor(private vkUserService: VkUserMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vkUser }) => {
            this.vkUser = vkUser;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vkUser.id !== undefined) {
            this.subscribeToSaveResponse(this.vkUserService.update(this.vkUser));
        } else {
            this.subscribeToSaveResponse(this.vkUserService.create(this.vkUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVkUserMySuffix>>) {
        result.subscribe((res: HttpResponse<IVkUserMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get vkUser() {
        return this._vkUser;
    }

    set vkUser(vkUser: IVkUserMySuffix) {
        this._vkUser = vkUser;
    }
}
