/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { VkGroupMySuffixComponent } from 'app/entities/vkbot/vk-group-my-suffix/vk-group-my-suffix.component';
import { VkGroupMySuffixService } from 'app/entities/vkbot/vk-group-my-suffix/vk-group-my-suffix.service';
import { VkGroupMySuffix } from 'app/shared/model/vkbot/vk-group-my-suffix.model';

describe('Component Tests', () => {
    describe('VkGroupMySuffix Management Component', () => {
        let comp: VkGroupMySuffixComponent;
        let fixture: ComponentFixture<VkGroupMySuffixComponent>;
        let service: VkGroupMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkGroupMySuffixComponent],
                providers: []
            })
                .overrideTemplate(VkGroupMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VkGroupMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkGroupMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new VkGroupMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.vkGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
