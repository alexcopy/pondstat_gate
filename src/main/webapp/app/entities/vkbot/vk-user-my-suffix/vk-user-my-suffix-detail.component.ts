import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';

@Component({
    selector: 'jhi-vk-user-my-suffix-detail',
    templateUrl: './vk-user-my-suffix-detail.component.html'
})
export class VkUserMySuffixDetailComponent implements OnInit {
    vkUser: IVkUserMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vkUser }) => {
            this.vkUser = vkUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
