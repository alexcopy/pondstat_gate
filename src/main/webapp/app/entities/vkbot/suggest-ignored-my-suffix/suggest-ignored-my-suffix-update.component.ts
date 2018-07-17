import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';
import { SuggestIgnoredMySuffixService } from './suggest-ignored-my-suffix.service';

@Component({
    selector: 'jhi-suggest-ignored-my-suffix-update',
    templateUrl: './suggest-ignored-my-suffix-update.component.html'
})
export class SuggestIgnoredMySuffixUpdateComponent implements OnInit {
    private _suggestIgnored: ISuggestIgnoredMySuffix;
    isSaving: boolean;

    constructor(private suggestIgnoredService: SuggestIgnoredMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ suggestIgnored }) => {
            this.suggestIgnored = suggestIgnored;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.suggestIgnored.id !== undefined) {
            this.subscribeToSaveResponse(this.suggestIgnoredService.update(this.suggestIgnored));
        } else {
            this.subscribeToSaveResponse(this.suggestIgnoredService.create(this.suggestIgnored));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISuggestIgnoredMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ISuggestIgnoredMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get suggestIgnored() {
        return this._suggestIgnored;
    }

    set suggestIgnored(suggestIgnored: ISuggestIgnoredMySuffix) {
        this._suggestIgnored = suggestIgnored;
    }
}
