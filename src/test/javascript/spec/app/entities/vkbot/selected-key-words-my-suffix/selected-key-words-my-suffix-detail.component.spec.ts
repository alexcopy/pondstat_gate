/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { SelectedKeyWordsMySuffixDetailComponent } from 'app/entities/vkbot/selected-key-words-my-suffix/selected-key-words-my-suffix-detail.component';
import { SelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';

describe('Component Tests', () => {
    describe('SelectedKeyWordsMySuffix Management Detail Component', () => {
        let comp: SelectedKeyWordsMySuffixDetailComponent;
        let fixture: ComponentFixture<SelectedKeyWordsMySuffixDetailComponent>;
        const route = ({ data: of({ selectedKeyWords: new SelectedKeyWordsMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SelectedKeyWordsMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SelectedKeyWordsMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SelectedKeyWordsMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.selectedKeyWords).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
