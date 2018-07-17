/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { FilterPumpCleaningMySuffixUpdateComponent } from 'app/entities/pond/filter-pump-cleaning-my-suffix/filter-pump-cleaning-my-suffix-update.component';
import { FilterPumpCleaningMySuffixService } from 'app/entities/pond/filter-pump-cleaning-my-suffix/filter-pump-cleaning-my-suffix.service';
import { FilterPumpCleaningMySuffix } from 'app/shared/model/pond/filter-pump-cleaning-my-suffix.model';

describe('Component Tests', () => {
    describe('FilterPumpCleaningMySuffix Management Update Component', () => {
        let comp: FilterPumpCleaningMySuffixUpdateComponent;
        let fixture: ComponentFixture<FilterPumpCleaningMySuffixUpdateComponent>;
        let service: FilterPumpCleaningMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [FilterPumpCleaningMySuffixUpdateComponent]
            })
                .overrideTemplate(FilterPumpCleaningMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FilterPumpCleaningMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilterPumpCleaningMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FilterPumpCleaningMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.filterPumpCleaning = entity;
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
                    const entity = new FilterPumpCleaningMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.filterPumpCleaning = entity;
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
