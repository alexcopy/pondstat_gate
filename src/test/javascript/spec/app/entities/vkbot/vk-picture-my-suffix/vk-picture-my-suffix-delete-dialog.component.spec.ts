/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GateTestModule } from '../../../../test.module';
import { VkPictureMySuffixDeleteDialogComponent } from 'app/entities/vkbot/vk-picture-my-suffix/vk-picture-my-suffix-delete-dialog.component';
import { VkPictureMySuffixService } from 'app/entities/vkbot/vk-picture-my-suffix/vk-picture-my-suffix.service';

describe('Component Tests', () => {
    describe('VkPictureMySuffix Management Delete Component', () => {
        let comp: VkPictureMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<VkPictureMySuffixDeleteDialogComponent>;
        let service: VkPictureMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkPictureMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(VkPictureMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VkPictureMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkPictureMySuffixService);
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
