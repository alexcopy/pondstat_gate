/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../test.module';
import { ResultsMatricesMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/results-matrices-my-suffix/results-matrices-my-suffix-delete-dialog.component';
import { ResultsMatricesMySuffixService } from '../../../../../../main/webapp/app/entities/results-matrices-my-suffix/results-matrices-my-suffix.service';

describe('Component Tests', () => {

    describe('ResultsMatricesMySuffix Management Delete Component', () => {
        let comp: ResultsMatricesMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ResultsMatricesMySuffixDeleteDialogComponent>;
        let service: ResultsMatricesMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ResultsMatricesMySuffixDeleteDialogComponent],
                providers: [
                    ResultsMatricesMySuffixService
                ]
            })
            .overrideTemplate(ResultsMatricesMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResultsMatricesMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResultsMatricesMySuffixService);
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
