/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { OtherWorksMySuffixDeleteDialogComponent } from 'app/entities/pond/other-works-my-suffix/other-works-my-suffix-delete-dialog.component';
import { OtherWorksMySuffixService } from 'app/entities/pond/other-works-my-suffix/other-works-my-suffix.service';

describe('Component Tests', () => {
    describe('OtherWorksMySuffix Management Delete Component', () => {
        let comp: OtherWorksMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<OtherWorksMySuffixDeleteDialogComponent>;
        let service: OtherWorksMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [OtherWorksMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(OtherWorksMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OtherWorksMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OtherWorksMySuffixService);
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
