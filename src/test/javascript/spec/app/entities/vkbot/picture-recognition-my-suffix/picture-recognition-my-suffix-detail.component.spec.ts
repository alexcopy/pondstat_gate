/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { PictureRecognitionMySuffixDetailComponent } from 'app/entities/vkbot/picture-recognition-my-suffix/picture-recognition-my-suffix-detail.component';
import { PictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';

describe('Component Tests', () => {
    describe('PictureRecognitionMySuffix Management Detail Component', () => {
        let comp: PictureRecognitionMySuffixDetailComponent;
        let fixture: ComponentFixture<PictureRecognitionMySuffixDetailComponent>;
        const route = ({ data: of({ pictureRecognition: new PictureRecognitionMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [PictureRecognitionMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PictureRecognitionMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PictureRecognitionMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pictureRecognition).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
