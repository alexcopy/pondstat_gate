/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { ClarifaiProcessMySuffixDeleteDialogComponent } from 'app/entities/vkbot/clarifai-process-my-suffix/clarifai-process-my-suffix-delete-dialog.component';
import { ClarifaiProcessMySuffixService } from 'app/entities/vkbot/clarifai-process-my-suffix/clarifai-process-my-suffix.service';

describe('Component Tests', () => {
    describe('ClarifaiProcessMySuffix Management Delete Component', () => {
        let comp: ClarifaiProcessMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ClarifaiProcessMySuffixDeleteDialogComponent>;
        let service: ClarifaiProcessMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaiProcessMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(ClarifaiProcessMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClarifaiProcessMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClarifaiProcessMySuffixService);
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
