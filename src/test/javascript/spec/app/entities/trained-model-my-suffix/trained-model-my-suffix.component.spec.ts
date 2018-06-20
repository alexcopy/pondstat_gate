/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../test.module';
import { TrainedModelMySuffixComponent } from '../../../../../../main/webapp/app/entities/trained-model-my-suffix/trained-model-my-suffix.component';
import { TrainedModelMySuffixService } from '../../../../../../main/webapp/app/entities/trained-model-my-suffix/trained-model-my-suffix.service';
import { TrainedModelMySuffix } from '../../../../../../main/webapp/app/entities/trained-model-my-suffix/trained-model-my-suffix.model';

describe('Component Tests', () => {

    describe('TrainedModelMySuffix Management Component', () => {
        let comp: TrainedModelMySuffixComponent;
        let fixture: ComponentFixture<TrainedModelMySuffixComponent>;
        let service: TrainedModelMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TrainedModelMySuffixComponent],
                providers: [
                    TrainedModelMySuffixService
                ]
            })
            .overrideTemplate(TrainedModelMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrainedModelMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainedModelMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TrainedModelMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.trainedModels[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
