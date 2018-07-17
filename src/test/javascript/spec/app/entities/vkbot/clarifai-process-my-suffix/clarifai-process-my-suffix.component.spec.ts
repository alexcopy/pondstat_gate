/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { ClarifaiProcessMySuffixComponent } from 'app/entities/vkbot/clarifai-process-my-suffix/clarifai-process-my-suffix.component';
import { ClarifaiProcessMySuffixService } from 'app/entities/vkbot/clarifai-process-my-suffix/clarifai-process-my-suffix.service';
import { ClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';

describe('Component Tests', () => {
    describe('ClarifaiProcessMySuffix Management Component', () => {
        let comp: ClarifaiProcessMySuffixComponent;
        let fixture: ComponentFixture<ClarifaiProcessMySuffixComponent>;
        let service: ClarifaiProcessMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaiProcessMySuffixComponent],
                providers: []
            })
                .overrideTemplate(ClarifaiProcessMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ClarifaiProcessMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClarifaiProcessMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ClarifaiProcessMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.clarifaiProcesses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
