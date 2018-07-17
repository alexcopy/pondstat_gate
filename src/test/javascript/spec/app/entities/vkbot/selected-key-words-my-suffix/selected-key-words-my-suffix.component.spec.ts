/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { SelectedKeyWordsMySuffixComponent } from 'app/entities/vkbot/selected-key-words-my-suffix/selected-key-words-my-suffix.component';
import { SelectedKeyWordsMySuffixService } from 'app/entities/vkbot/selected-key-words-my-suffix/selected-key-words-my-suffix.service';
import { SelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';

describe('Component Tests', () => {
    describe('SelectedKeyWordsMySuffix Management Component', () => {
        let comp: SelectedKeyWordsMySuffixComponent;
        let fixture: ComponentFixture<SelectedKeyWordsMySuffixComponent>;
        let service: SelectedKeyWordsMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SelectedKeyWordsMySuffixComponent],
                providers: []
            })
                .overrideTemplate(SelectedKeyWordsMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SelectedKeyWordsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SelectedKeyWordsMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SelectedKeyWordsMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.selectedKeyWords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
