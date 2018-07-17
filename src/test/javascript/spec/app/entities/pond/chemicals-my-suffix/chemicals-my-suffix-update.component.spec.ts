/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ChemicalsMySuffixUpdateComponent } from 'app/entities/pond/chemicals-my-suffix/chemicals-my-suffix-update.component';
import { ChemicalsMySuffixService } from 'app/entities/pond/chemicals-my-suffix/chemicals-my-suffix.service';
import { ChemicalsMySuffix } from 'app/shared/model/pond/chemicals-my-suffix.model';

describe('Component Tests', () => {
    describe('ChemicalsMySuffix Management Update Component', () => {
        let comp: ChemicalsMySuffixUpdateComponent;
        let fixture: ComponentFixture<ChemicalsMySuffixUpdateComponent>;
        let service: ChemicalsMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ChemicalsMySuffixUpdateComponent]
            })
                .overrideTemplate(ChemicalsMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChemicalsMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChemicalsMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ChemicalsMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.chemicals = entity;
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
                    const entity = new ChemicalsMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.chemicals = entity;
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
