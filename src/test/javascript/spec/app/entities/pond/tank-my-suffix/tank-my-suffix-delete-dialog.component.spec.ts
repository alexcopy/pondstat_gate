/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { TankMySuffixDeleteDialogComponent } from 'app/entities/pond/tank-my-suffix/tank-my-suffix-delete-dialog.component';
import { TankMySuffixService } from 'app/entities/pond/tank-my-suffix/tank-my-suffix.service';

describe('Component Tests', () => {
    describe('TankMySuffix Management Delete Component', () => {
        let comp: TankMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TankMySuffixDeleteDialogComponent>;
        let service: TankMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TankMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TankMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TankMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TankMySuffixService);
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
