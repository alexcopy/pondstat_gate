/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { VkUserMySuffixDeleteDialogComponent } from 'app/entities/vkbot/vk-user-my-suffix/vk-user-my-suffix-delete-dialog.component';
import { VkUserMySuffixService } from 'app/entities/vkbot/vk-user-my-suffix/vk-user-my-suffix.service';

describe('Component Tests', () => {
    describe('VkUserMySuffix Management Delete Component', () => {
        let comp: VkUserMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<VkUserMySuffixDeleteDialogComponent>;
        let service: VkUserMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkUserMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(VkUserMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VkUserMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkUserMySuffixService);
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
