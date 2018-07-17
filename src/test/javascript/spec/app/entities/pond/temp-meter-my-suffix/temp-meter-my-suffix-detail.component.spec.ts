/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { TempMeterMySuffixDetailComponent } from 'app/entities/pond/temp-meter-my-suffix/temp-meter-my-suffix-detail.component';
import { TempMeterMySuffix } from 'app/shared/model/pond/temp-meter-my-suffix.model';

describe('Component Tests', () => {
    describe('TempMeterMySuffix Management Detail Component', () => {
        let comp: TempMeterMySuffixDetailComponent;
        let fixture: ComponentFixture<TempMeterMySuffixDetailComponent>;
        const route = ({ data: of({ tempMeter: new TempMeterMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TempMeterMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TempMeterMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TempMeterMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tempMeter).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
