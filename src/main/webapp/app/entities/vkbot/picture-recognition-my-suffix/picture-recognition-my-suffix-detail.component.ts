import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';

@Component({
    selector: 'jhi-picture-recognition-my-suffix-detail',
    templateUrl: './picture-recognition-my-suffix-detail.component.html'
})
export class PictureRecognitionMySuffixDetailComponent implements OnInit {
    pictureRecognition: IPictureRecognitionMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pictureRecognition }) => {
            this.pictureRecognition = pictureRecognition;
        });
    }

    previousState() {
        window.history.back();
    }
}
