/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GateTestModule } from '../../../../test.module';
import { SuggestIgnoredMySuffixUpdateComponent } from 'app/entities/vkbot/suggest-ignored-my-suffix/suggest-ignored-my-suffix-update.component';
import { SuggestIgnoredMySuffixService } from 'app/entities/vkbot/suggest-ignored-my-suffix/suggest-ignored-my-suffix.service';
import { SuggestIgnoredMySuffix } from 'app/shared/model/vkbot/suggest-ignored-my-suffix.model';

describe('Component Tests', () => {
    describe('SuggestIgnoredMySuffix Management Update Component', () => {
        let comp: SuggestIgnoredMySuffixUpdateComponent;
        let fixture: ComponentFixture<SuggestIgnoredMySuffixUpdateComponent>;
        let service: SuggestIgnoredMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GateTestModule],
                declarations: [SuggestIgnoredMySuffixUpdateComponent]
            })
                .overrideTemplate(SuggestIgnoredMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SuggestIgnoredMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SuggestIgnoredMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SuggestIgnoredMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.suggestIgnored = entity;
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
                    const entity = new SuggestIgnoredMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.suggestIgnored = entity;
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
