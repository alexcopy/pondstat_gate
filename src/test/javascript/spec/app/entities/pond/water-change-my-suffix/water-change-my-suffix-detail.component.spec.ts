/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { WaterChangeMySuffixDetailComponent } from 'app/entities/pond/water-change-my-suffix/water-change-my-suffix-detail.component';
import { WaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';

describe('Component Tests', () => {
    describe('WaterChangeMySuffix Management Detail Component', () => {
        let comp: WaterChangeMySuffixDetailComponent;
        let fixture: ComponentFixture<WaterChangeMySuffixDetailComponent>;
        const route = ({ data: of({ waterChange: new WaterChangeMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [WaterChangeMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WaterChangeMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WaterChangeMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.waterChange).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
