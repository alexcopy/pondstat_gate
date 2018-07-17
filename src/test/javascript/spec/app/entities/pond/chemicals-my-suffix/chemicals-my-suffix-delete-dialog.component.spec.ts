/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { ChemicalsMySuffixDeleteDialogComponent } from 'app/entities/pond/chemicals-my-suffix/chemicals-my-suffix-delete-dialog.component';
import { ChemicalsMySuffixService } from 'app/entities/pond/chemicals-my-suffix/chemicals-my-suffix.service';

describe('Component Tests', () => {
    describe('ChemicalsMySuffix Management Delete Component', () => {
        let comp: ChemicalsMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ChemicalsMySuffixDeleteDialogComponent>;
        let service: ChemicalsMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ChemicalsMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(ChemicalsMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChemicalsMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChemicalsMySuffixService);
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
