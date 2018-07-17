import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IVkGroupMySuffix } from 'app/shared/model/vkbot/vk-group-my-suffix.model';
import { VkGroupMySuffixService } from './vk-group-my-suffix.service';

@Component({
    selector: 'jhi-vk-group-my-suffix-update',
    templateUrl: './vk-group-my-suffix-update.component.html'
})
export class VkGroupMySuffixUpdateComponent implements OnInit {
    private _vkGroup: IVkGroupMySuffix;
    isSaving: boolean;

    constructor(private vkGroupService: VkGroupMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vkGroup }) => {
            this.vkGroup = vkGroup;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vkGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.vkGroupService.update(this.vkGroup));
        } else {
            this.subscribeToSaveResponse(this.vkGroupService.create(this.vkGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVkGroupMySuffix>>) {
        result.subscribe((res: HttpResponse<IVkGroupMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get vkGroup() {
        return this._vkGroup;
    }

    set vkGroup(vkGroup: IVkGroupMySuffix) {
        this._vkGroup = vkGroup;
    }
}
