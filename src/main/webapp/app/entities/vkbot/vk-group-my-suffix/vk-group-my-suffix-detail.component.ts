import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVkGroupMySuffix } from 'app/shared/model/vkbot/vk-group-my-suffix.model';

@Component({
    selector: 'jhi-vk-group-my-suffix-detail',
    templateUrl: './vk-group-my-suffix-detail.component.html'
})
export class VkGroupMySuffixDetailComponent implements OnInit {
    vkGroup: IVkGroupMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vkGroup }) => {
            this.vkGroup = vkGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}
