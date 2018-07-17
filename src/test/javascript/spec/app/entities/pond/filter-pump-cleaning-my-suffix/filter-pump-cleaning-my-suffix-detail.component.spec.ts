/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { FilterPumpCleaningMySuffixDetailComponent } from 'app/entities/pond/filter-pump-cleaning-my-suffix/filter-pump-cleaning-my-suffix-detail.component';
import { FilterPumpCleaningMySuffix } from 'app/shared/model/pond/filter-pump-cleaning-my-suffix.model';

describe('Component Tests', () => {
    describe('FilterPumpCleaningMySuffix Management Detail Component', () => {
        let comp: FilterPumpCleaningMySuffixDetailComponent;
        let fixture: ComponentFixture<FilterPumpCleaningMySuffixDetailComponent>;
        const route = ({ data: of({ filterPumpCleaning: new FilterPumpCleaningMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [FilterPumpCleaningMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FilterPumpCleaningMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FilterPumpCleaningMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.filterPumpCleaning).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
