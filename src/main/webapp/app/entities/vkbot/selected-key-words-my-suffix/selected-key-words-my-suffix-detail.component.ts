import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';

@Component({
    selector: 'jhi-selected-key-words-my-suffix-detail',
    templateUrl: './selected-key-words-my-suffix-detail.component.html'
})
export class SelectedKeyWordsMySuffixDetailComponent implements OnInit {
    selectedKeyWords: ISelectedKeyWordsMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ selectedKeyWords }) => {
            this.selectedKeyWords = selectedKeyWords;
        });
    }

    previousState() {
        window.history.back();
    }
}
