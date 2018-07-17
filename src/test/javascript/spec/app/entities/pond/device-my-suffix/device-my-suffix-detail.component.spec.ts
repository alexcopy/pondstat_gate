/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { DeviceMySuffixDetailComponent } from 'app/entities/pond/device-my-suffix/device-my-suffix-detail.component';
import { DeviceMySuffix } from 'app/shared/model/pond/device-my-suffix.model';

describe('Component Tests', () => {
    describe('DeviceMySuffix Management Detail Component', () => {
        let comp: DeviceMySuffixDetailComponent;
        let fixture: ComponentFixture<DeviceMySuffixDetailComponent>;
        const route = ({ data: of({ device: new DeviceMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [DeviceMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DeviceMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeviceMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.device).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
