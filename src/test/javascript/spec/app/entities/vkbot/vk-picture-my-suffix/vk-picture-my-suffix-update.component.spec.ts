/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { VkPictureMySuffixUpdateComponent } from 'app/entities/vkbot/vk-picture-my-suffix/vk-picture-my-suffix-update.component';
import { VkPictureMySuffixService } from 'app/entities/vkbot/vk-picture-my-suffix/vk-picture-my-suffix.service';
import { VkPictureMySuffix } from 'app/shared/model/vkbot/vk-picture-my-suffix.model';

describe('Component Tests', () => {
    describe('VkPictureMySuffix Management Update Component', () => {
        let comp: VkPictureMySuffixUpdateComponent;
        let fixture: ComponentFixture<VkPictureMySuffixUpdateComponent>;
        let service: VkPictureMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkPictureMySuffixUpdateComponent]
            })
                .overrideTemplate(VkPictureMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VkPictureMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkPictureMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VkPictureMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vkPicture = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VkPictureMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vkPicture = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
