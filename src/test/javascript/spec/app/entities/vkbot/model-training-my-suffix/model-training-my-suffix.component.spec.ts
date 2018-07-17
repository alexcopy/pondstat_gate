/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { ModelTrainingMySuffixComponent } from 'app/entities/vkbot/model-training-my-suffix/model-training-my-suffix.component';
import { ModelTrainingMySuffixService } from 'app/entities/vkbot/model-training-my-suffix/model-training-my-suffix.service';
import { ModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';

describe('Component Tests', () => {
    describe('ModelTrainingMySuffix Management Component', () => {
        let comp: ModelTrainingMySuffixComponent;
        let fixture: ComponentFixture<ModelTrainingMySuffixComponent>;
        let service: ModelTrainingMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ModelTrainingMySuffixComponent],
                providers: []
            })
                .overrideTemplate(ModelTrainingMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ModelTrainingMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelTrainingMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ModelTrainingMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.modelTrainings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
