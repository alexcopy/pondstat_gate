/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../test.module';
import { ClarifaisMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/clarifais-my-suffix/clarifais-my-suffix-delete-dialog.component';
import { ClarifaisMySuffixService } from '../../../../../../main/webapp/app/entities/clarifais-my-suffix/clarifais-my-suffix.service';

describe('Component Tests', () => {

    describe('ClarifaisMySuffix Management Delete Component', () => {
        let comp: ClarifaisMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ClarifaisMySuffixDeleteDialogComponent>;
        let service: ClarifaisMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaisMySuffixDeleteDialogComponent],
                providers: [
                    ClarifaisMySuffixService
                ]
            })
            .overrideTemplate(ClarifaisMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClarifaisMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClarifaisMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

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
