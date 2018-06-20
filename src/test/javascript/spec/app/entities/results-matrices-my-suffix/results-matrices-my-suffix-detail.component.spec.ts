/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GateTestModule } from '../../../test.module';
import { ResultsMatricesMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/results-matrices-my-suffix/results-matrices-my-suffix-detail.component';
import { ResultsMatricesMySuffixService } from '../../../../../../main/webapp/app/entities/results-matrices-my-suffix/results-matrices-my-suffix.service';
import { ResultsMatricesMySuffix } from '../../../../../../main/webapp/app/entities/results-matrices-my-suffix/results-matrices-my-suffix.model';

describe('Component Tests', () => {

    describe('ResultsMatricesMySuffix Management Detail Component', () => {
        let comp: ResultsMatricesMySuffixDetailComponent;
        let fixture: ComponentFixture<ResultsMatricesMySuffixDetailComponent>;
        let service: ResultsMatricesMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ResultsMatricesMySuffixDetailComponent],
                providers: [
                    ResultsMatricesMySuffixService
                ]
            })
            .overrideTemplate(ResultsMatricesMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResultsMatricesMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResultsMatricesMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ResultsMatricesMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.resultsMatrices).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
