/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { ClarifaisMySuffixDeleteDialogComponent } from 'app/entities/vkbot/clarifais-my-suffix/clarifais-my-suffix-delete-dialog.component';
import { ClarifaisMySuffixService } from 'app/entities/vkbot/clarifais-my-suffix/clarifais-my-suffix.service';

describe('Component Tests', () => {
    describe('ClarifaisMySuffix Management Delete Component', () => {
        let comp: ClarifaisMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ClarifaisMySuffixDeleteDialogComponent>;
        let service: ClarifaisMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaisMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(ClarifaisMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClarifaisMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClarifaisMySuffixService);
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
