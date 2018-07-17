import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';

@Component({
    selector: 'jhi-suggest-ignored-my-suffix-detail',
    templateUrl: './suggest-ignored-my-suffix-detail.component.html'
})
export class SuggestIgnoredMySuffixDetailComponent implements OnInit {
    suggestIgnored: ISuggestIgnoredMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ suggestIgnored }) => {
            this.suggestIgnored = suggestIgnored;
        });
    }

    previousState() {
        window.history.back();
    }
}
