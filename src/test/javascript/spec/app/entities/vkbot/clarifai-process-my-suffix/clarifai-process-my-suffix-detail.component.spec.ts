/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { ClarifaiProcessMySuffixDetailComponent } from 'app/entities/vkbot/clarifai-process-my-suffix/clarifai-process-my-suffix-detail.component';
import { ClarifaiProcessMySuffix } from 'app/shared/model/vkbot/clarifai-process-my-suffix.model';

describe('Component Tests', () => {
    describe('ClarifaiProcessMySuffix Management Detail Component', () => {
        let comp: ClarifaiProcessMySuffixDetailComponent;
        let fixture: ComponentFixture<ClarifaiProcessMySuffixDetailComponent>;
        const route = ({ data: of({ clarifaiProcess: new ClarifaiProcessMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [ClarifaiProcessMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ClarifaiProcessMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ClarifaiProcessMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.clarifaiProcess).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
