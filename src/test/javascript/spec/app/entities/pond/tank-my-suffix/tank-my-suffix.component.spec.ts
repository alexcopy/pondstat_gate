/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { TankMySuffixComponent } from 'app/entities/pond/tank-my-suffix/tank-my-suffix.component';
import { TankMySuffixService } from 'app/entities/pond/tank-my-suffix/tank-my-suffix.service';
import { TankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';

describe('Component Tests', () => {
    describe('TankMySuffix Management Component', () => {
        let comp: TankMySuffixComponent;
        let fixture: ComponentFixture<TankMySuffixComponent>;
        let service: TankMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TankMySuffixComponent],
                providers: []
            })
                .overrideTemplate(TankMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TankMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TankMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TankMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tanks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
