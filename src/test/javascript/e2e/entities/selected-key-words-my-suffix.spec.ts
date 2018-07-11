import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SelectedKeyWords e2e test', () => {

    let navBarPage: NavBarPage;
    let selectedKeyWordsDialogPage: SelectedKeyWordsDialogPage;
    let selectedKeyWordsComponentsPage: SelectedKeyWordsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SelectedKeyWords', () => {
        navBarPage.goToEntity('selected-key-words-my-suffix');
        selectedKeyWordsComponentsPage = new SelectedKeyWordsComponentsPage();
        expect(selectedKeyWordsComponentsPage.getTitle())
            .toMatch(/gateApp.selectedKeyWords.home.title/);

    });

    it('should load create SelectedKeyWords dialog', () => {
        selectedKeyWordsComponentsPage.clickOnCreateButton();
        selectedKeyWordsDialogPage = new SelectedKeyWordsDialogPage();
        expect(selectedKeyWordsDialogPage.getModalTitle())
            .toMatch(/gateApp.selectedKeyWords.home.createOrEditLabel/);
        selectedKeyWordsDialogPage.close();
    });

    it('should create and save SelectedKeyWords', () => {
        selectedKeyWordsComponentsPage.clickOnCreateButton();
        selectedKeyWordsDialogPage.setModelidInput('5');
        expect(selectedKeyWordsDialogPage.getModelidInput()).toMatch('5');
        selectedKeyWordsDialogPage.setPosmatrixInput('posmatrix');
        expect(selectedKeyWordsDialogPage.getPosmatrixInput()).toMatch('posmatrix');
        selectedKeyWordsDialogPage.setNeutmatrixInput('neutmatrix');
        expect(selectedKeyWordsDialogPage.getNeutmatrixInput()).toMatch('neutmatrix');
        selectedKeyWordsDialogPage.setNegmatrixInput('negmatrix');
        expect(selectedKeyWordsDialogPage.getNegmatrixInput()).toMatch('negmatrix');
        selectedKeyWordsDialogPage.save();
        expect(selectedKeyWordsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SelectedKeyWordsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-selected-key-words-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SelectedKeyWordsDialogPage {
    modalTitle = element(by.css('h4#mySelectedKeyWordsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    modelidInput = element(by.css('input#field_modelid'));
    posmatrixInput = element(by.css('input#field_posmatrix'));
    neutmatrixInput = element(by.css('input#field_neutmatrix'));
    negmatrixInput = element(by.css('input#field_negmatrix'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setModelidInput = function(modelid) {
        this.modelidInput.sendKeys(modelid);
    };

    getModelidInput = function() {
        return this.modelidInput.getAttribute('value');
    };

    setPosmatrixInput = function(posmatrix) {
        this.posmatrixInput.sendKeys(posmatrix);
    };

    getPosmatrixInput = function() {
        return this.posmatrixInput.getAttribute('value');
    };

    setNeutmatrixInput = function(neutmatrix) {
        this.neutmatrixInput.sendKeys(neutmatrix);
    };

    getNeutmatrixInput = function() {
        return this.neutmatrixInput.getAttribute('value');
    };

    setNegmatrixInput = function(negmatrix) {
        this.negmatrixInput.sendKeys(negmatrix);
    };

    getNegmatrixInput = function() {
        return this.negmatrixInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
