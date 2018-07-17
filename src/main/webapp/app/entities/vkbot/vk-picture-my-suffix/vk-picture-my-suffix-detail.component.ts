import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';

@Component({
    selector: 'jhi-vk-picture-my-suffix-detail',
    templateUrl: './vk-picture-my-suffix-detail.component.html'
})
export class VkPictureMySuffixDetailComponent implements OnInit {
    vkPicture: IVkPictureMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vkPicture }) => {
            this.vkPicture = vkPicture;
        });
    }

    previousState() {
        window.history.back();
    }
}
