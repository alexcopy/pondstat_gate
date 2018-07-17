/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { LiveStockMySuffixDetailComponent } from 'app/entities/pond/live-stock-my-suffix/live-stock-my-suffix-detail.component';
import { LiveStockMySuffix } from 'app/shared/model/pond/live-stock-my-suffix.model';

describe('Component Tests', () => {
    describe('LiveStockMySuffix Management Detail Component', () => {
        let comp: LiveStockMySuffixDetailComponent;
        let fixture: ComponentFixture<LiveStockMySuffixDetailComponent>;
        const route = ({ data: of({ liveStock: new LiveStockMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [LiveStockMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LiveStockMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LiveStockMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.liveStock).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
