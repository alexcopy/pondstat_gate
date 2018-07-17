/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { WaterChangeMySuffixComponent } from 'app/entities/pond/water-change-my-suffix/water-change-my-suffix.component';
import { WaterChangeMySuffixService } from 'app/entities/pond/water-change-my-suffix/water-change-my-suffix.service';
import { WaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';

describe('Component Tests', () => {
    describe('WaterChangeMySuffix Management Component', () => {
        let comp: WaterChangeMySuffixComponent;
        let fixture: ComponentFixture<WaterChangeMySuffixComponent>;
        let service: WaterChangeMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [WaterChangeMySuffixComponent],
                providers: []
            })
                .overrideTemplate(WaterChangeMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WaterChangeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WaterChangeMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new WaterChangeMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.waterChanges[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
