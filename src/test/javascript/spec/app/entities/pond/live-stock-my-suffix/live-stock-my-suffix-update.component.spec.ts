/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { LiveStockMySuffixUpdateComponent } from 'app/entities/pond/live-stock-my-suffix/live-stock-my-suffix-update.component';
import { LiveStockMySuffixService } from 'app/entities/pond/live-stock-my-suffix/live-stock-my-suffix.service';
import { LiveStockMySuffix } from 'app/shared/model/pond/live-stock-my-suffix.model';

describe('Component Tests', () => {
    describe('LiveStockMySuffix Management Update Component', () => {
        let comp: LiveStockMySuffixUpdateComponent;
        let fixture: ComponentFixture<LiveStockMySuffixUpdateComponent>;
        let service: LiveStockMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [LiveStockMySuffixUpdateComponent]
            })
                .overrideTemplate(LiveStockMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LiveStockMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LiveStockMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LiveStockMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.liveStock = entity;
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
                    const entity = new LiveStockMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.liveStock = entity;
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
