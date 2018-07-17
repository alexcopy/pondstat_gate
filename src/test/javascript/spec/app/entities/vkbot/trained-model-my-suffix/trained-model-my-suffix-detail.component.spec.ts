/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { TrainedModelMySuffixDetailComponent } from 'app/entities/vkbot/trained-model-my-suffix/trained-model-my-suffix-detail.component';
import { TrainedModelMySuffix } from 'app/shared/model/vkbot/trained-model-my-suffix.model';

describe('Component Tests', () => {
    describe('TrainedModelMySuffix Management Detail Component', () => {
        let comp: TrainedModelMySuffixDetailComponent;
        let fixture: ComponentFixture<TrainedModelMySuffixDetailComponent>;
        const route = ({ data: of({ trainedModel: new TrainedModelMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TrainedModelMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrainedModelMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainedModelMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.trainedModel).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
