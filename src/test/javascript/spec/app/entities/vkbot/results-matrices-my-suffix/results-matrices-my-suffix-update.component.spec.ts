/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ResultsMatricesMySuffixUpdateComponent } from 'app/entities/vkbot/results-matrices-my-suffix/results-matrices-my-suffix-update.component';
import { ResultsMatricesMySuffixService } from 'app/entities/vkbot/results-matrices-my-suffix/results-matrices-my-suffix.service';
import { ResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';

describe('Component Tests', () => {
    describe('ResultsMatricesMySuffix Management Update Component', () => {
        let comp: ResultsMatricesMySuffixUpdateComponent;
        let fixture: ComponentFixture<ResultsMatricesMySuffixUpdateComponent>;
        let service: ResultsMatricesMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ResultsMatricesMySuffixUpdateComponent]
            })
                .overrideTemplate(ResultsMatricesMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ResultsMatricesMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResultsMatricesMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ResultsMatricesMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.resultsMatrices = entity;
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
                    const entity = new ResultsMatricesMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.resultsMatrices = entity;
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
