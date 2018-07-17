/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ModelTrainingMySuffixDetailComponent } from 'app/entities/vkbot/model-training-my-suffix/model-training-my-suffix-detail.component';
import { ModelTrainingMySuffix } from 'app/shared/model/vkbot/model-training-my-suffix.model';

describe('Component Tests', () => {
    describe('ModelTrainingMySuffix Management Detail Component', () => {
        let comp: ModelTrainingMySuffixDetailComponent;
        let fixture: ComponentFixture<ModelTrainingMySuffixDetailComponent>;
        const route = ({ data: of({ modelTraining: new ModelTrainingMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ModelTrainingMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ModelTrainingMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ModelTrainingMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.modelTraining).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
