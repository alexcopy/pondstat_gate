/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { OtherWorksMySuffixDetailComponent } from 'app/entities/pond/other-works-my-suffix/other-works-my-suffix-detail.component';
import { OtherWorksMySuffix } from 'app/shared/model/pond/other-works-my-suffix.model';

describe('Component Tests', () => {
    describe('OtherWorksMySuffix Management Detail Component', () => {
        let comp: OtherWorksMySuffixDetailComponent;
        let fixture: ComponentFixture<OtherWorksMySuffixDetailComponent>;
        const route = ({ data: of({ otherWorks: new OtherWorksMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [OtherWorksMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OtherWorksMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OtherWorksMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.otherWorks).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
