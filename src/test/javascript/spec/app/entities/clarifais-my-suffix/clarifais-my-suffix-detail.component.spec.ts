/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GateTestModule } from '../../../test.module';
import { ClarifaisMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/clarifais-my-suffix/clarifais-my-suffix-detail.component';
import { ClarifaisMySuffixService } from '../../../../../../main/webapp/app/entities/clarifais-my-suffix/clarifais-my-suffix.service';
import { ClarifaisMySuffix } from '../../../../../../main/webapp/app/entities/clarifais-my-suffix/clarifais-my-suffix.model';

describe('Component Tests', () => {

    describe('ClarifaisMySuffix Management Detail Component', () => {
        let comp: ClarifaisMySuffixDetailComponent;
        let fixture: ComponentFixture<ClarifaisMySuffixDetailComponent>;
        let service: ClarifaisMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaisMySuffixDetailComponent],
                providers: [
                    ClarifaisMySuffixService
                ]
            })
            .overrideTemplate(ClarifaisMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClarifaisMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClarifaisMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClarifaisMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clarifais).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
