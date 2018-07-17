/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { VkUserMySuffixDetailComponent } from 'app/entities/vkbot/vk-user-my-suffix/vk-user-my-suffix-detail.component';
import { VkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';

describe('Component Tests', () => {
    describe('VkUserMySuffix Management Detail Component', () => {
        let comp: VkUserMySuffixDetailComponent;
        let fixture: ComponentFixture<VkUserMySuffixDetailComponent>;
        const route = ({ data: of({ vkUser: new VkUserMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkUserMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VkUserMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VkUserMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vkUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
