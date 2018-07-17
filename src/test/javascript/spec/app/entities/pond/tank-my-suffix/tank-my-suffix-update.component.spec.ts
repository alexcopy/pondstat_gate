/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { TankMySuffixUpdateComponent } from 'app/entities/pond/tank-my-suffix/tank-my-suffix-update.component';
import { TankMySuffixService } from 'app/entities/pond/tank-my-suffix/tank-my-suffix.service';
import { TankMySuffix } from 'app/shared/model/pond/tank-my-suffix.model';

describe('Component Tests', () => {
    describe('TankMySuffix Management Update Component', () => {
        let comp: TankMySuffixUpdateComponent;
        let fixture: ComponentFixture<TankMySuffixUpdateComponent>;
        let service: TankMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TankMySuffixUpdateComponent]
            })
                .overrideTemplate(TankMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TankMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TankMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TankMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tank = entity;
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
                    const entity = new TankMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tank = entity;
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
