/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../test.module';
import { ClarifaisMySuffixComponent } from '../../../../../../main/webapp/app/entities/clarifais-my-suffix/clarifais-my-suffix.component';
import { ClarifaisMySuffixService } from '../../../../../../main/webapp/app/entities/clarifais-my-suffix/clarifais-my-suffix.service';
import { ClarifaisMySuffix } from '../../../../../../main/webapp/app/entities/clarifais-my-suffix/clarifais-my-suffix.model';

describe('Component Tests', () => {

    describe('ClarifaisMySuffix Management Component', () => {
        let comp: ClarifaisMySuffixComponent;
        let fixture: ComponentFixture<ClarifaisMySuffixComponent>;
        let service: ClarifaisMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaisMySuffixComponent],
                providers: [
                    ClarifaisMySuffixService
                ]
            })
            .overrideTemplate(ClarifaisMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClarifaisMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClarifaisMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClarifaisMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clarifais[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
