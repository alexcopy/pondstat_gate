/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ClarifaisMySuffixDetailComponent } from 'app/entities/vkbot/clarifais-my-suffix/clarifais-my-suffix-detail.component';
import { ClarifaisMySuffix } from 'app/shared/model/vkbot/clarifais-my-suffix.model';

describe('Component Tests', () => {
    describe('ClarifaisMySuffix Management Detail Component', () => {
        let comp: ClarifaisMySuffixDetailComponent;
        let fixture: ComponentFixture<ClarifaisMySuffixDetailComponent>;
        const route = ({ data: of({ clarifais: new ClarifaisMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaisMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ClarifaisMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClarifaisMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.clarifais).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
