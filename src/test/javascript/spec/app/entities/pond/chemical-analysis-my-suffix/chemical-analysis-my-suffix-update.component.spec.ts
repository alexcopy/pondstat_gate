/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ChemicalAnalysisMySuffixUpdateComponent } from 'app/entities/pond/chemical-analysis-my-suffix/chemical-analysis-my-suffix-update.component';
import { ChemicalAnalysisMySuffixService } from 'app/entities/pond/chemical-analysis-my-suffix/chemical-analysis-my-suffix.service';
import { ChemicalAnalysisMySuffix } from 'app/shared/model/pond/chemical-analysis-my-suffix.model';

describe('Component Tests', () => {
    describe('ChemicalAnalysisMySuffix Management Update Component', () => {
        let comp: ChemicalAnalysisMySuffixUpdateComponent;
        let fixture: ComponentFixture<ChemicalAnalysisMySuffixUpdateComponent>;
        let service: ChemicalAnalysisMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ChemicalAnalysisMySuffixUpdateComponent]
            })
                .overrideTemplate(ChemicalAnalysisMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChemicalAnalysisMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChemicalAnalysisMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ChemicalAnalysisMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.chemicalAnalysis = entity;
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
                    const entity = new ChemicalAnalysisMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.chemicalAnalysis = entity;
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
