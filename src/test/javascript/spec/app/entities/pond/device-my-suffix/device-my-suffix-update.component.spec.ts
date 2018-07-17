/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { DeviceMySuffixUpdateComponent } from 'app/entities/pond/device-my-suffix/device-my-suffix-update.component';
import { DeviceMySuffixService } from 'app/entities/pond/device-my-suffix/device-my-suffix.service';
import { DeviceMySuffix } from 'app/shared/model/pond/device-my-suffix.model';

describe('Component Tests', () => {
    describe('DeviceMySuffix Management Update Component', () => {
        let comp: DeviceMySuffixUpdateComponent;
        let fixture: ComponentFixture<DeviceMySuffixUpdateComponent>;
        let service: DeviceMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [DeviceMySuffixUpdateComponent]
            })
                .overrideTemplate(DeviceMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeviceMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeviceMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DeviceMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.device = entity;
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
                    const entity = new DeviceMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.device = entity;
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
