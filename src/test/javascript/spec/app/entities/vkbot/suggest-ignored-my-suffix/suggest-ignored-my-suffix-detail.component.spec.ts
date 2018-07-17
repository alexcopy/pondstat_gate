/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { SuggestIgnoredMySuffixDetailComponent } from 'app/entities/vkbot/suggest-ignored-my-suffix/suggest-ignored-my-suffix-detail.component';
import { SuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';

describe('Component Tests', () => {
    describe('SuggestIgnoredMySuffix Management Detail Component', () => {
        let comp: SuggestIgnoredMySuffixDetailComponent;
        let fixture: ComponentFixture<SuggestIgnoredMySuffixDetailComponent>;
        const route = ({ data: of({ suggestIgnored: new SuggestIgnoredMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SuggestIgnoredMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SuggestIgnoredMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SuggestIgnoredMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.suggestIgnored).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
