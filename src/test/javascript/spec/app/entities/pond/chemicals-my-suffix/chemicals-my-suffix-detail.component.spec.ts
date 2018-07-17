/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ChemicalsMySuffixDetailComponent } from 'app/entities/pond/chemicals-my-suffix/chemicals-my-suffix-detail.component';
import { ChemicalsMySuffix } from 'app/shared/model/pond/chemicals-my-suffix.model';

describe('Component Tests', () => {
    describe('ChemicalsMySuffix Management Detail Component', () => {
        let comp: ChemicalsMySuffixDetailComponent;
        let fixture: ComponentFixture<ChemicalsMySuffixDetailComponent>;
        const route = ({ data: of({ chemicals: new ChemicalsMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ChemicalsMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ChemicalsMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChemicalsMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.chemicals).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
