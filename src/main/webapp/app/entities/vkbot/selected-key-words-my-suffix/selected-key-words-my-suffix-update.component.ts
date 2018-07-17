import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';
import { SelectedKeyWordsMySuffixService } from './selected-key-words-my-suffix.service';

@Component({
    selector: 'jhi-selected-key-words-my-suffix-update',
    templateUrl: './selected-key-words-my-suffix-update.component.html'
})
export class SelectedKeyWordsMySuffixUpdateComponent implements OnInit {
    private _selectedKeyWords: ISelectedKeyWordsMySuffix;
    isSaving: boolean;

    constructor(private selectedKeyWordsService: SelectedKeyWordsMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ selectedKeyWords }) => {
            this.selectedKeyWords = selectedKeyWords;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.selectedKeyWords.id !== undefined) {
            this.subscribeToSaveResponse(this.selectedKeyWordsService.update(this.selectedKeyWords));
        } else {
            this.subscribeToSaveResponse(this.selectedKeyWordsService.create(this.selectedKeyWords));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISelectedKeyWordsMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<ISelectedKeyWordsMySuffix>) => this.onSaveSuccess(),
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
    get selectedKeyWords() {
        return this._selectedKeyWords;
    }

    set selectedKeyWords(selectedKeyWords: ISelectedKeyWordsMySuffix) {
        this._selectedKeyWords = selectedKeyWords;
    }
}
