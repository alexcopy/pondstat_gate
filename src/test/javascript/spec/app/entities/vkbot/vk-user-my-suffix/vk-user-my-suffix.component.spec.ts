/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { VkUserMySuffixComponent } from 'app/entities/vkbot/vk-user-my-suffix/vk-user-my-suffix.component';
import { VkUserMySuffixService } from 'app/entities/vkbot/vk-user-my-suffix/vk-user-my-suffix.service';
import { VkUserMySuffix } from 'app/shared/model/vkbot/vk-user-my-suffix.model';

describe('Component Tests', () => {
    describe('VkUserMySuffix Management Component', () => {
        let comp: VkUserMySuffixComponent;
        let fixture: ComponentFixture<VkUserMySuffixComponent>;
        let service: VkUserMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkUserMySuffixComponent],
                providers: []
            })
                .overrideTemplate(VkUserMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VkUserMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkUserMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VkUserMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.vkUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
