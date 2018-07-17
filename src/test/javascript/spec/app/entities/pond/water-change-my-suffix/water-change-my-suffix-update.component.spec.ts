/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { WaterChangeMySuffixUpdateComponent } from 'app/entities/pond/water-change-my-suffix/water-change-my-suffix-update.component';
import { WaterChangeMySuffixService } from 'app/entities/pond/water-change-my-suffix/water-change-my-suffix.service';
import { WaterChangeMySuffix } from 'app/shared/model/pond/water-change-my-suffix.model';

describe('Component Tests', () => {
    describe('WaterChangeMySuffix Management Update Component', () => {
        let comp: WaterChangeMySuffixUpdateComponent;
        let fixture: ComponentFixture<WaterChangeMySuffixUpdateComponent>;
        let service: WaterChangeMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [WaterChangeMySuffixUpdateComponent]
            })
                .overrideTemplate(WaterChangeMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WaterChangeMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WaterChangeMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WaterChangeMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.waterChange = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WaterChangeMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.waterChange = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
