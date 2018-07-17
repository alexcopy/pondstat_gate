/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { MeterReadingMySuffixDetailComponent } from 'app/entities/pond/meter-reading-my-suffix/meter-reading-my-suffix-detail.component';
import { MeterReadingMySuffix } from 'app/shared/model/pond/meter-reading-my-suffix.model';

describe('Component Tests', () => {
    describe('MeterReadingMySuffix Management Detail Component', () => {
        let comp: MeterReadingMySuffixDetailComponent;
        let fixture: ComponentFixture<MeterReadingMySuffixDetailComponent>;
        const route = ({ data: of({ meterReading: new MeterReadingMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [MeterReadingMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MeterReadingMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MeterReadingMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.meterReading).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
