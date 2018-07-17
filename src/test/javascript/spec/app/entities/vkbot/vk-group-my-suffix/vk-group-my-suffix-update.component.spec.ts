/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { VkGroupMySuffixUpdateComponent } from 'app/entities/vkbot/vk-group-my-suffix/vk-group-my-suffix-update.component';
import { VkGroupMySuffixService } from 'app/entities/vkbot/vk-group-my-suffix/vk-group-my-suffix.service';
import { VkGroupMySuffix } from 'app/shared/model/vkbot/vk-group-my-suffix.model';

describe('Component Tests', () => {
    describe('VkGroupMySuffix Management Update Component', () => {
        let comp: VkGroupMySuffixUpdateComponent;
        let fixture: ComponentFixture<VkGroupMySuffixUpdateComponent>;
        let service: VkGroupMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkGroupMySuffixUpdateComponent]
            })
                .overrideTemplate(VkGroupMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VkGroupMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkGroupMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VkGroupMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vkGroup = entity;
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
                    const entity = new VkGroupMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vkGroup = entity;
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
