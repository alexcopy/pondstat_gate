import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IVkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';
import { VkPictureMySuffixService } from './vk-picture-my-suffix.service';

@Component({
    selector: 'jhi-vk-picture-my-suffix-update',
    templateUrl: './vk-picture-my-suffix-update.component.html'
})
export class VkPictureMySuffixUpdateComponent implements OnInit {
    private _vkPicture: IVkPictureMySuffix;
    isSaving: boolean;

    constructor(private vkPictureService: VkPictureMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vkPicture }) => {
            this.vkPicture = vkPicture;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vkPicture.id !== undefined) {
            this.subscribeToSaveResponse(this.vkPictureService.update(this.vkPicture));
        } else {
            this.subscribeToSaveResponse(this.vkPictureService.create(this.vkPicture));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVkPictureMySuffix>>) {
        result.subscribe((res: HttpResponse<IVkPictureMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get vkPicture() {
        return this._vkPicture;
    }

    set vkPicture(vkPicture: IVkPictureMySuffix) {
        this._vkPicture = vkPicture;
    }
}
