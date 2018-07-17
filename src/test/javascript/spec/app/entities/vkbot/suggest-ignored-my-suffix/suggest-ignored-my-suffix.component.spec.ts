/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { SuggestIgnoredMySuffixComponent } from 'app/entities/vkbot/suggest-ignored-my-suffix/suggest-ignored-my-suffix.component';
import { SuggestIgnoredMySuffixService } from 'app/entities/vkbot/suggest-ignored-my-suffix/suggest-ignored-my-suffix.service';
import { SuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';

describe('Component Tests', () => {
    describe('SuggestIgnoredMySuffix Management Component', () => {
        let comp: SuggestIgnoredMySuffixComponent;
        let fixture: ComponentFixture<SuggestIgnoredMySuffixComponent>;
        let service: SuggestIgnoredMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SuggestIgnoredMySuffixComponent],
                providers: []
            })
                .overrideTemplate(SuggestIgnoredMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SuggestIgnoredMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuggestIgnoredMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SuggestIgnoredMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.suggestIgnoreds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
