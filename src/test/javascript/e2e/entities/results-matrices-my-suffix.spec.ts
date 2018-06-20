import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ResultsMatrices e2e test', () => {

    let navBarPage: NavBarPage;
    let resultsMatricesDialogPage: ResultsMatricesDialogPage;
    let resultsMatricesComponentsPage: ResultsMatricesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ResultsMatrices', () => {
        navBarPage.goToEntity('results-matrices-my-suffix');
        resultsMatricesComponentsPage = new ResultsMatricesComponentsPage();
        expect(resultsMatricesComponentsPage.getTitle())
            .toMatch(/gateApp.resultsMatrices.home.title/);

    });

    it('should load create ResultsMatrices dialog', () => {
        resultsMatricesComponentsPage.clickOnCreateButton();
        resultsMatricesDialogPage = new ResultsMatricesDialogPage();
        expect(resultsMatricesDialogPage.getModalTitle())
            .toMatch(/gateApp.resultsMatrices.home.createOrEditLabel/);
        resultsMatricesDialogPage.close();
    });

    it('should create and save ResultsMatrices', () => {
        resultsMatricesComponentsPage.clickOnCreateButton();
        resultsMatricesDialogPage.setResidInput('5');
        expect(resultsMatricesDialogPage.getResidInput()).toMatch('5');
        resultsMatricesDialogPage.setResultInput('5');
        expect(resultsMatricesDialogPage.getResultInput()).toMatch('5');
        resultsMatricesDialogPage.setTypeInput('5');
        expect(resultsMatricesDialogPage.getTypeInput()).toMatch('5');
        resultsMatricesDialogPage.setMatrixInput('5');
        expect(resultsMatricesDialogPage.getMatrixInput()).toMatch('5');
        resultsMatricesDialogPage.save();
        expect(resultsMatricesDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ResultsMatricesComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-results-matrices-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ResultsMatricesDialogPage {
    modalTitle = element(by.css('h4#myResultsMatricesLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    residInput = element(by.css('input#field_resid'));
    resultInput = element(by.css('input#field_result'));
    typeInput = element(by.css('input#field_type'));
    matrixInput = element(by.css('input#field_matrix'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setResidInput = function(resid) {
        this.residInput.sendKeys(resid);
    };

    getResidInput = function() {
        return this.residInput.getAttribute('value');
    };

    setResultInput = function(result) {
        this.resultInput.sendKeys(result);
    };

    getResultInput = function() {
        return this.resultInput.getAttribute('value');
    };

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    };

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    };

    setMatrixInput = function(matrix) {
        this.matrixInput.sendKeys(matrix);
    };

    getMatrixInput = function() {
        return this.matrixInput.getAttribute('value');
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
