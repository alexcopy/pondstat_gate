import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOtherWorksMySuffix } from 'app/shared/model/pond/other-works-my-suffix.model';

@Component({
    selector: 'jhi-other-works-my-suffix-detail',
    templateUrl: './other-works-my-suffix-detail.component.html'
})
export class OtherWorksMySuffixDetailComponent implements OnInit {
    otherWorks: IOtherWorksMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ otherWorks }) => {
            this.otherWorks = otherWorks;
        });
    }

    previousState() {
        window.history.back();
    }
}
