/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { ResultsMatricesMySuffixComponent } from 'app/entities/vkbot/results-matrices-my-suffix/results-matrices-my-suffix.component';
import { ResultsMatricesMySuffixService } from 'app/entities/vkbot/results-matrices-my-suffix/results-matrices-my-suffix.service';
import { ResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';

describe('Component Tests', () => {
    describe('ResultsMatricesMySuffix Management Component', () => {
        let comp: ResultsMatricesMySuffixComponent;
        let fixture: ComponentFixture<ResultsMatricesMySuffixComponent>;
        let service: ResultsMatricesMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ResultsMatricesMySuffixComponent],
                providers: []
            })
                .overrideTemplate(ResultsMatricesMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ResultsMatricesMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResultsMatricesMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ResultsMatricesMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.resultsMatrices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
