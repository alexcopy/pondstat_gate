/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { SuggestIgnoredMySuffixDeleteDialogComponent } from 'app/entities/vkbot/suggest-ignored-my-suffix/suggest-ignored-my-suffix-delete-dialog.component';
import { SuggestIgnoredMySuffixService } from 'app/entities/vkbot/suggest-ignored-my-suffix/suggest-ignored-my-suffix.service';

describe('Component Tests', () => {
    describe('SuggestIgnoredMySuffix Management Delete Component', () => {
        let comp: SuggestIgnoredMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SuggestIgnoredMySuffixDeleteDialogComponent>;
        let service: SuggestIgnoredMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SuggestIgnoredMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(SuggestIgnoredMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SuggestIgnoredMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuggestIgnoredMySuffixService);
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
