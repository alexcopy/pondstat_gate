/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { TrainedModelMySuffixDeleteDialogComponent } from 'app/entities/vkbot/trained-model-my-suffix/trained-model-my-suffix-delete-dialog.component';
import { TrainedModelMySuffixService } from 'app/entities/vkbot/trained-model-my-suffix/trained-model-my-suffix.service';

describe('Component Tests', () => {
    describe('TrainedModelMySuffix Management Delete Component', () => {
        let comp: TrainedModelMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TrainedModelMySuffixDeleteDialogComponent>;
        let service: TrainedModelMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [TrainedModelMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TrainedModelMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainedModelMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainedModelMySuffixService);
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
