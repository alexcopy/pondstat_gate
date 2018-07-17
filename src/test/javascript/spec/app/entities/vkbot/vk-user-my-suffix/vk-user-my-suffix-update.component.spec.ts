/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { VkUserMySuffixUpdateComponent } from 'app/entities/vkbot/vk-user-my-suffix/vk-user-my-suffix-update.component';
import { VkUserMySuffixService } from 'app/entities/vkbot/vk-user-my-suffix/vk-user-my-suffix.service';
import { VkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';

describe('Component Tests', () => {
    describe('VkUserMySuffix Management Update Component', () => {
        let comp: VkUserMySuffixUpdateComponent;
        let fixture: ComponentFixture<VkUserMySuffixUpdateComponent>;
        let service: VkUserMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkUserMySuffixUpdateComponent]
            })
                .overrideTemplate(VkUserMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VkUserMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkUserMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new VkUserMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vkUser = entity;
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
                    const entity = new VkUserMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.vkUser = entity;
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
