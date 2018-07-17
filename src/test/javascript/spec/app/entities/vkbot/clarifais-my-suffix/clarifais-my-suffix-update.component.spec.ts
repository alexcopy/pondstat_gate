/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ClarifaisMySuffixUpdateComponent } from 'app/entities/vkbot/clarifais-my-suffix/clarifais-my-suffix-update.component';
import { ClarifaisMySuffixService } from 'app/entities/vkbot/clarifais-my-suffix/clarifais-my-suffix.service';
import { ClarifaisMySuffix } from 'app/shared/model/vkbot/clarifais-my-suffix.model';

describe('Component Tests', () => {
    describe('ClarifaisMySuffix Management Update Component', () => {
        let comp: ClarifaisMySuffixUpdateComponent;
        let fixture: ComponentFixture<ClarifaisMySuffixUpdateComponent>;
        let service: ClarifaisMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaisMySuffixUpdateComponent]
            })
                .overrideTemplate(ClarifaisMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClarifaisMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClarifaisMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ClarifaisMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.clarifais = entity;
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
                    const entity = new ClarifaisMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.clarifais = entity;
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
