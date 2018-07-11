/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GateTestModule } from '../../../test.module';
import { SelectedKeyWordsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/selected-key-words-my-suffix/selected-key-words-my-suffix-detail.component';
import { SelectedKeyWordsMySuffixService } from '../../../../../../main/webapp/app/entities/selected-key-words-my-suffix/selected-key-words-my-suffix.service';
import { SelectedKeyWordsMySuffix } from '../../../../../../main/webapp/app/entities/selected-key-words-my-suffix/selected-key-words-my-suffix.model';

describe('Component Tests', () => {

    describe('SelectedKeyWordsMySuffix Management Detail Component', () => {
        let comp: SelectedKeyWordsMySuffixDetailComponent;
        let fixture: ComponentFixture<SelectedKeyWordsMySuffixDetailComponent>;
        let service: SelectedKeyWordsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SelectedKeyWordsMySuffixDetailComponent],
                providers: [
                    SelectedKeyWordsMySuffixService
                ]
            })
            .overrideTemplate(SelectedKeyWordsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SelectedKeyWordsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SelectedKeyWordsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SelectedKeyWordsMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.selectedKeyWords).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
