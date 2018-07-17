/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { SelectedKeyWordsMySuffixUpdateComponent } from 'app/entities/vkbot/selected-key-words-my-suffix/selected-key-words-my-suffix-update.component';
import { SelectedKeyWordsMySuffixService } from 'app/entities/vkbot/selected-key-words-my-suffix/selected-key-words-my-suffix.service';
import { SelectedKeyWordsMySuffix } from 'app/shared/model/vkbot/selected-key-words-my-suffix.model';

describe('Component Tests', () => {
    describe('SelectedKeyWordsMySuffix Management Update Component', () => {
        let comp: SelectedKeyWordsMySuffixUpdateComponent;
        let fixture: ComponentFixture<SelectedKeyWordsMySuffixUpdateComponent>;
        let service: SelectedKeyWordsMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SelectedKeyWordsMySuffixUpdateComponent]
            })
                .overrideTemplate(SelectedKeyWordsMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SelectedKeyWordsMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SelectedKeyWordsMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SelectedKeyWordsMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.selectedKeyWords = entity;
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
                    const entity = new SelectedKeyWordsMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.selectedKeyWords = entity;
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
