/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { VkGroupMySuffixDeleteDialogComponent } from 'app/entities/vkbot/vk-group-my-suffix/vk-group-my-suffix-delete-dialog.component';
import { VkGroupMySuffixService } from 'app/entities/vkbot/vk-group-my-suffix/vk-group-my-suffix.service';

describe('Component Tests', () => {
    describe('VkGroupMySuffix Management Delete Component', () => {
        let comp: VkGroupMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<VkGroupMySuffixDeleteDialogComponent>;
        let service: VkGroupMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkGroupMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(VkGroupMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VkGroupMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkGroupMySuffixService);
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
