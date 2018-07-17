/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { OtherWorksMySuffixUpdateComponent } from 'app/entities/pond/other-works-my-suffix/other-works-my-suffix-update.component';
import { OtherWorksMySuffixService } from 'app/entities/pond/other-works-my-suffix/other-works-my-suffix.service';
import { OtherWorksMySuffix } from 'app/shared/model/pond/other-works-my-suffix.model';

describe('Component Tests', () => {
    describe('OtherWorksMySuffix Management Update Component', () => {
        let comp: OtherWorksMySuffixUpdateComponent;
        let fixture: ComponentFixture<OtherWorksMySuffixUpdateComponent>;
        let service: OtherWorksMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [OtherWorksMySuffixUpdateComponent]
            })
                .overrideTemplate(OtherWorksMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OtherWorksMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OtherWorksMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OtherWorksMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.otherWorks = entity;
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
                    const entity = new OtherWorksMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.otherWorks = entity;
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
