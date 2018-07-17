/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { ChemicalAnalysisMySuffixDeleteDialogComponent } from 'app/entities/pond/chemical-analysis-my-suffix/chemical-analysis-my-suffix-delete-dialog.component';
import { ChemicalAnalysisMySuffixService } from 'app/entities/pond/chemical-analysis-my-suffix/chemical-analysis-my-suffix.service';

describe('Component Tests', () => {
    describe('ChemicalAnalysisMySuffix Management Delete Component', () => {
        let comp: ChemicalAnalysisMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ChemicalAnalysisMySuffixDeleteDialogComponent>;
        let service: ChemicalAnalysisMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ChemicalAnalysisMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(ChemicalAnalysisMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChemicalAnalysisMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChemicalAnalysisMySuffixService);
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
