/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { PictureRecognitionMySuffixDeleteDialogComponent } from 'app/entities/vkbot/picture-recognition-my-suffix/picture-recognition-my-suffix-delete-dialog.component';
import { PictureRecognitionMySuffixService } from 'app/entities/vkbot/picture-recognition-my-suffix/picture-recognition-my-suffix.service';

describe('Component Tests', () => {
    describe('PictureRecognitionMySuffix Management Delete Component', () => {
        let comp: PictureRecognitionMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PictureRecognitionMySuffixDeleteDialogComponent>;
        let service: PictureRecognitionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [PictureRecognitionMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PictureRecognitionMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PictureRecognitionMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PictureRecognitionMySuffixService);
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
