/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { TrainedModelMySuffixUpdateComponent } from 'app/entities/vkbot/trained-model-my-suffix/trained-model-my-suffix-update.component';
import { TrainedModelMySuffixService } from 'app/entities/vkbot/trained-model-my-suffix/trained-model-my-suffix.service';
import { TrainedModelMySuffix } from 'app/shared/model/vkbot/trained-model-my-suffix.model';

describe('Component Tests', () => {
    describe('TrainedModelMySuffix Management Update Component', () => {
        let comp: TrainedModelMySuffixUpdateComponent;
        let fixture: ComponentFixture<TrainedModelMySuffixUpdateComponent>;
        let service: TrainedModelMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TrainedModelMySuffixUpdateComponent]
            })
                .overrideTemplate(TrainedModelMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrainedModelMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainedModelMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TrainedModelMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.trainedModel = entity;
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
                    const entity = new TrainedModelMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.trainedModel = entity;
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
