/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { TankMySuffixDetailComponent } from 'app/entities/pond/tank-my-suffix/tank-my-suffix-detail.component';
import { TankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';

describe('Component Tests', () => {
    describe('TankMySuffix Management Detail Component', () => {
        let comp: TankMySuffixDetailComponent;
        let fixture: ComponentFixture<TankMySuffixDetailComponent>;
        const route = ({ data: of({ tank: new TankMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TankMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TankMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TankMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tank).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
