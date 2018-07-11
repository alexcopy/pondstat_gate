/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../test.module';
import { SelectedKeyWordsMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/selected-key-words-my-suffix/selected-key-words-my-suffix-dialog.component';
import { SelectedKeyWordsMySuffixService } from '../../../../../../main/webapp/app/entities/selected-key-words-my-suffix/selected-key-words-my-suffix.service';
import { SelectedKeyWordsMySuffix } from '../../../../../../main/webapp/app/entities/selected-key-words-my-suffix/selected-key-words-my-suffix.model';

describe('Component Tests', () => {

    describe('SelectedKeyWordsMySuffix Management Dialog Component', () => {
        let comp: SelectedKeyWordsMySuffixDialogComponent;
        let fixture: ComponentFixture<SelectedKeyWordsMySuffixDialogComponent>;
        let service: SelectedKeyWordsMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SelectedKeyWordsMySuffixDialogComponent],
                providers: [
                    SelectedKeyWordsMySuffixService
                ]
            })
            .overrideTemplate(SelectedKeyWordsMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SelectedKeyWordsMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SelectedKeyWordsMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SelectedKeyWordsMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.selectedKeyWords = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'selectedKeyWordsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SelectedKeyWordsMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.selectedKeyWords = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'selectedKeyWordsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
