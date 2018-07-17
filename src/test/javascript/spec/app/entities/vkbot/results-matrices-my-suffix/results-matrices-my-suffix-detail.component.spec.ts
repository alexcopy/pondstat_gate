/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ResultsMatricesMySuffixDetailComponent } from 'app/entities/vkbot/results-matrices-my-suffix/results-matrices-my-suffix-detail.component';
import { ResultsMatricesMySuffix } from 'app/shared/model/vkbot/results-matrices-my-suffix.model';

describe('Component Tests', () => {
    describe('ResultsMatricesMySuffix Management Detail Component', () => {
        let comp: ResultsMatricesMySuffixDetailComponent;
        let fixture: ComponentFixture<ResultsMatricesMySuffixDetailComponent>;
        const route = ({ data: of({ resultsMatrices: new ResultsMatricesMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ResultsMatricesMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ResultsMatricesMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ResultsMatricesMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.resultsMatrices).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
