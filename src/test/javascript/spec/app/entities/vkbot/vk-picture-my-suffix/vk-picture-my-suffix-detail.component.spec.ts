/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { VkPictureMySuffixDetailComponent } from 'app/entities/vkbot/vk-picture-my-suffix/vk-picture-my-suffix-detail.component';
import { VkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';

describe('Component Tests', () => {
    describe('VkPictureMySuffix Management Detail Component', () => {
        let comp: VkPictureMySuffixDetailComponent;
        let fixture: ComponentFixture<VkPictureMySuffixDetailComponent>;
        const route = ({ data: of({ vkPicture: new VkPictureMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkPictureMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VkPictureMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VkPictureMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.vkPicture).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
