/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ChemicalAnalysisMySuffixDetailComponent } from 'app/entities/pond/chemical-analysis-my-suffix/chemical-analysis-my-suffix-detail.component';
import { ChemicalAnalysisMySuffix } from 'app/shared/model/pond/chemical-analysis-my-suffix.model';

describe('Component Tests', () => {
    describe('ChemicalAnalysisMySuffix Management Detail Component', () => {
        let comp: ChemicalAnalysisMySuffixDetailComponent;
        let fixture: ComponentFixture<ChemicalAnalysisMySuffixDetailComponent>;
        const route = ({ data: of({ chemicalAnalysis: new ChemicalAnalysisMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ChemicalAnalysisMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ChemicalAnalysisMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChemicalAnalysisMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.chemicalAnalysis).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
