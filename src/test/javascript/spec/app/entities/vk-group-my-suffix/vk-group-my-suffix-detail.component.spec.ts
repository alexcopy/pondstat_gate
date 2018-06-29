/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GateTestModule } from '../../../test.module';
import { VkGroupMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/vk-group-my-suffix/vk-group-my-suffix-detail.component';
import { VkGroupMySuffixService } from '../../../../../../main/webapp/app/entities/vk-group-my-suffix/vk-group-my-suffix.service';
import { VkGroupMySuffix } from '../../../../../../main/webapp/app/entities/vk-group-my-suffix/vk-group-my-suffix.model';

describe('Component Tests', () => {

    describe('VkGroupMySuffix Management Detail Component', () => {
        let comp: VkGroupMySuffixDetailComponent;
        let fixture: ComponentFixture<VkGroupMySuffixDetailComponent>;
        let service: VkGroupMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [VkGroupMySuffixDetailComponent],
                providers: [
                    VkGroupMySuffixService
                ]
            })
            .overrideTemplate(VkGroupMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VkGroupMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VkGroupMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VkGroupMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vkGroup).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
