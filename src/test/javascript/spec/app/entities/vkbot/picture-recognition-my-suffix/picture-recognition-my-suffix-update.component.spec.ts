/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { PictureRecognitionMySuffixUpdateComponent } from 'app/entities/vkbot/picture-recognition-my-suffix/picture-recognition-my-suffix-update.component';
import { PictureRecognitionMySuffixService } from 'app/entities/vkbot/picture-recognition-my-suffix/picture-recognition-my-suffix.service';
import { PictureRecognitionMySuffix } from 'app/shared/model/vkbot/picture-recognition-my-suffix.model';

describe('Component Tests', () => {
    describe('PictureRecognitionMySuffix Management Update Component', () => {
        let comp: PictureRecognitionMySuffixUpdateComponent;
        let fixture: ComponentFixture<PictureRecognitionMySuffixUpdateComponent>;
        let service: PictureRecognitionMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [PictureRecognitionMySuffixUpdateComponent]
            })
                .overrideTemplate(PictureRecognitionMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PictureRecognitionMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PictureRecognitionMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PictureRecognitionMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pictureRecognition = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PictureRecognitionMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pictureRecognition = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
