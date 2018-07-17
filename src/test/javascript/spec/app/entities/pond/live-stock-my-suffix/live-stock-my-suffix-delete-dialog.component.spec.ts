/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { LiveStockMySuffixDeleteDialogComponent } from 'app/entities/pond/live-stock-my-suffix/live-stock-my-suffix-delete-dialog.component';
import { LiveStockMySuffixService } from 'app/entities/pond/live-stock-my-suffix/live-stock-my-suffix.service';

describe('Component Tests', () => {
    describe('LiveStockMySuffix Management Delete Component', () => {
        let comp: LiveStockMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LiveStockMySuffixDeleteDialogComponent>;
        let service: LiveStockMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [LiveStockMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(LiveStockMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LiveStockMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LiveStockMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
