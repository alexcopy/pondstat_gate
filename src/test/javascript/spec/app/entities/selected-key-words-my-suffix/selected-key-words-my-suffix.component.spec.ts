/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../test.module';
import { SelectedKeyWordsMySuffixComponent } from '../../../../../../main/webapp/app/entities/selected-key-words-my-suffix/selected-key-words-my-suffix.component';
import { SelectedKeyWordsMySuffixService } from '../../../../../../main/webapp/app/entities/selected-key-words-my-suffix/selected-key-words-my-suffix.service';
import { SelectedKeyWordsMySuffix } from '../../../../../../main/webapp/app/entities/selected-key-words-my-suffix/selected-key-words-my-suffix.model';

describe('Component Tests', () => {

    describe('SelectedKeyWordsMySuffix Management Component', () => {
        let comp: SelectedKeyWordsMySuffixComponent;
        let fixture: ComponentFixture<SelectedKeyWordsMySuffixComponent>;
        let service: SelectedKeyWordsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SelectedKeyWordsMySuffixComponent],
                providers: [
                    SelectedKeyWordsMySuffixService
                ]
            })
            .overrideTemplate(SelectedKeyWordsMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SelectedKeyWordsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SelectedKeyWordsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SelectedKeyWordsMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.selectedKeyWords[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
