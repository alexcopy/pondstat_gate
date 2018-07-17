/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { TempMeterMySuffixUpdateComponent } from 'app/entities/pond/temp-meter-my-suffix/temp-meter-my-suffix-update.component';
import { TempMeterMySuffixService } from 'app/entities/pond/temp-meter-my-suffix/temp-meter-my-suffix.service';
import { TempMeterMySuffix } from 'app/shared/model/pond/temp-meter-my-suffix.model';

describe('Component Tests', () => {
    describe('TempMeterMySuffix Management Update Component', () => {
        let comp: TempMeterMySuffixUpdateComponent;
        let fixture: ComponentFixture<TempMeterMySuffixUpdateComponent>;
        let service: TempMeterMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TempMeterMySuffixUpdateComponent]
            })
                .overrideTemplate(TempMeterMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TempMeterMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TempMeterMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TempMeterMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tempMeter = entity;
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
                    const entity = new TempMeterMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tempMeter = entity;
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
