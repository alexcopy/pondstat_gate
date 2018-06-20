/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../test.module';
import { ResultsMatricesMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/results-matrices-my-suffix/results-matrices-my-suffix-dialog.component';
import { ResultsMatricesMySuffixService } from '../../../../../../main/webapp/app/entities/results-matrices-my-suffix/results-matrices-my-suffix.service';
import { ResultsMatricesMySuffix } from '../../../../../../main/webapp/app/entities/results-matrices-my-suffix/results-matrices-my-suffix.model';

describe('Component Tests', () => {

    describe('ResultsMatricesMySuffix Management Dialog Component', () => {
        let comp: ResultsMatricesMySuffixDialogComponent;
        let fixture: ComponentFixture<ResultsMatricesMySuffixDialogComponent>;
        let service: ResultsMatricesMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ResultsMatricesMySuffixDialogComponent],
                providers: [
                    ResultsMatricesMySuffixService
                ]
            })
            .overrideTemplate(ResultsMatricesMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResultsMatricesMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResultsMatricesMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ResultsMatricesMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.resultsMatrices = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'resultsMatricesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ResultsMatricesMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.resultsMatrices = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'resultsMatricesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
