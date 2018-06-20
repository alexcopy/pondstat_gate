/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GateTestModule } from '../../../test.module';
import { TrainedModelMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/trained-model-my-suffix/trained-model-my-suffix-detail.component';
import { TrainedModelMySuffixService } from '../../../../../../main/webapp/app/entities/trained-model-my-suffix/trained-model-my-suffix.service';
import { TrainedModelMySuffix } from '../../../../../../main/webapp/app/entities/trained-model-my-suffix/trained-model-my-suffix.model';

describe('Component Tests', () => {

    describe('TrainedModelMySuffix Management Detail Component', () => {
        let comp: TrainedModelMySuffixDetailComponent;
        let fixture: ComponentFixture<TrainedModelMySuffixDetailComponent>;
        let service: TrainedModelMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TrainedModelMySuffixDetailComponent],
                providers: [
                    TrainedModelMySuffixService
                ]
            })
            .overrideTemplate(TrainedModelMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrainedModelMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainedModelMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TrainedModelMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.trainedModel).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
