/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GateTestModule } from '../../../../test.module';
import { PictureRecognitionMySuffixComponent } from 'app/entities/vkbot/picture-recognition-my-suffix/picture-recognition-my-suffix.component';
import { PictureRecognitionMySuffixService } from 'app/entities/vkbot/picture-recognition-my-suffix/picture-recognition-my-suffix.service';
import { PictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';

describe('Component Tests', () => {
    describe('PictureRecognitionMySuffix Management Component', () => {
        let comp: PictureRecognitionMySuffixComponent;
        let fixture: ComponentFixture<PictureRecognitionMySuffixComponent>;
        let service: PictureRecognitionMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [PictureRecognitionMySuffixComponent],
                providers: []
            })
                .overrideTemplate(PictureRecognitionMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PictureRecognitionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PictureRecognitionMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PictureRecognitionMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.pictureRecognitions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
