/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { VkPictureMySuffixComponent } from 'app/entities/vkbot/vk-picture-my-suffix/vk-picture-my-suffix.component';
import { VkPictureMySuffixService } from 'app/entities/vkbot/vk-picture-my-suffix/vk-picture-my-suffix.service';
import { VkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';

describe('Component Tests', () => {
    describe('VkPictureMySuffix Management Component', () => {
        let comp: VkPictureMySuffixComponent;
        let fixture: ComponentFixture<VkPictureMySuffixComponent>;
        let service: VkPictureMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkPictureMySuffixComponent],
                providers: []
            })
                .overrideTemplate(VkPictureMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VkPictureMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkPictureMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VkPictureMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.vkPictures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
