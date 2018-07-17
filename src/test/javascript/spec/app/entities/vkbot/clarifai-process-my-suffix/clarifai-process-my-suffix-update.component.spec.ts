/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ClarifaiProcessMySuffixUpdateComponent } from 'app/entities/vkbot/clarifai-process-my-suffix/clarifai-process-my-suffix-update.component';
import { ClarifaiProcessMySuffixService } from 'app/entities/vkbot/clarifai-process-my-suffix/clarifai-process-my-suffix.service';
import { ClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';

describe('Component Tests', () => {
    describe('ClarifaiProcessMySuffix Management Update Component', () => {
        let comp: ClarifaiProcessMySuffixUpdateComponent;
        let fixture: ComponentFixture<ClarifaiProcessMySuffixUpdateComponent>;
        let service: ClarifaiProcessMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaiProcessMySuffixUpdateComponent]
            })
                .overrideTemplate(ClarifaiProcessMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClarifaiProcessMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClarifaiProcessMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ClarifaiProcessMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.clarifaiProcess = entity;
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
                    const entity = new ClarifaiProcessMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.clarifaiProcess = entity;
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
