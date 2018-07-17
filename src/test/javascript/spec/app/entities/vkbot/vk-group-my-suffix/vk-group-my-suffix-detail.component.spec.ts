/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { VkGroupMySuffixDetailComponent } from 'app/entities/vkbot/vk-group-my-suffix/vk-group-my-suffix-detail.component';
import { VkGroupMySuffix } from 'app/shared/model/vkbot/vk-group-my-suffix.model';

describe('Component Tests', () => {
    describe('VkGroupMySuffix Management Detail Component', () => {
        let comp: VkGroupMySuffixDetailComponent;
        let fixture: ComponentFixture<VkGroupMySuffixDetailComponent>;
        const route = ({ data: of({ vkGroup: new VkGroupMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkGroupMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VkGroupMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VkGroupMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vkGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
