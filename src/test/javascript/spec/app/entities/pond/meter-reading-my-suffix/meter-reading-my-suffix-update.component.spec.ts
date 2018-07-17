/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { MeterReadingMySuffixUpdateComponent } from 'app/entities/pond/meter-reading-my-suffix/meter-reading-my-suffix-update.component';
import { MeterReadingMySuffixService } from 'app/entities/pond/meter-reading-my-suffix/meter-reading-my-suffix.service';
import { MeterReadingMySuffix } from 'app/shared/model/pond/meter-reading-my-suffix.model';

describe('Component Tests', () => {
    describe('MeterReadingMySuffix Management Update Component', () => {
        let comp: MeterReadingMySuffixUpdateComponent;
        let fixture: ComponentFixture<MeterReadingMySuffixUpdateComponent>;
        let service: MeterReadingMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [MeterReadingMySuffixUpdateComponent]
            })
                .overrideTemplate(MeterReadingMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MeterReadingMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterReadingMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MeterReadingMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterReading = entity;
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
                    const entity = new MeterReadingMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.meterReading = entity;
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
