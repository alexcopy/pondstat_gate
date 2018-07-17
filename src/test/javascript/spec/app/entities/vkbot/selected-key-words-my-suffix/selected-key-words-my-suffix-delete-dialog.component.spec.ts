/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { SelectedKeyWordsMySuffixDeleteDialogComponent } from 'app/entities/vkbot/selected-key-words-my-suffix/selected-key-words-my-suffix-delete-dialog.component';
import { SelectedKeyWordsMySuffixService } from 'app/entities/vkbot/selected-key-words-my-suffix/selected-key-words-my-suffix.service';

describe('Component Tests', () => {
    describe('SelectedKeyWordsMySuffix Management Delete Component', () => {
        let comp: SelectedKeyWordsMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SelectedKeyWordsMySuffixDeleteDialogComponent>;
        let service: SelectedKeyWordsMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SelectedKeyWordsMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(SelectedKeyWordsMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SelectedKeyWordsMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SelectedKeyWordsMySuffixService);
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
