/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ModelTrainingMySuffixUpdateComponent } from 'app/entities/vkbot/model-training-my-suffix/model-training-my-suffix-update.component';
import { ModelTrainingMySuffixService } from 'app/entities/vkbot/model-training-my-suffix/model-training-my-suffix.service';
import { ModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';

describe('Component Tests', () => {
    describe('ModelTrainingMySuffix Management Update Component', () => {
        let comp: ModelTrainingMySuffixUpdateComponent;
        let fixture: ComponentFixture<ModelTrainingMySuffixUpdateComponent>;
        let service: ModelTrainingMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ModelTrainingMySuffixUpdateComponent]
            })
                .overrideTemplate(ModelTrainingMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ModelTrainingMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelTrainingMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ModelTrainingMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.modelTraining = entity;
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
                    const entity = new ModelTrainingMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.modelTraining = entity;
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
