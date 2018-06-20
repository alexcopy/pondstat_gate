import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TrainedModel e2e test', () => {

    let navBarPage: NavBarPage;
    let trainedModelDialogPage: TrainedModelDialogPage;
    let trainedModelComponentsPage: TrainedModelComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TrainedModels', () => {
        navBarPage.goToEntity('trained-model-my-suffix');
        trainedModelComponentsPage = new TrainedModelComponentsPage();
        expect(trainedModelComponentsPage.getTitle())
            .toMatch(/gateApp.trainedModel.home.title/);

    });

    it('should load create TrainedModel dialog', () => {
        trainedModelComponentsPage.clickOnCreateButton();
        trainedModelDialogPage = new TrainedModelDialogPage();
        expect(trainedModelDialogPage.getModalTitle())
            .toMatch(/gateApp.trainedModel.home.createOrEditLabel/);
        trainedModelDialogPage.close();
    });

    it('should create and save TrainedModels', () => {
        trainedModelComponentsPage.clickOnCreateButton();
        trainedModelDialogPage.setModelNameInput('modelName');
        expect(trainedModelDialogPage.getModelNameInput()).toMatch('modelName');
        trainedModelDialogPage.setPosmatrixInput('posmatrix');
        expect(trainedModelDialogPage.getPosmatrixInput()).toMatch('posmatrix');
        trainedModelDialogPage.setNegmatrixInput('negmatrix');
        expect(trainedModelDialogPage.getNegmatrixInput()).toMatch('negmatrix');
        trainedModelDialogPage.setNeutmatrixInput('neutmatrix');
        expect(trainedModelDialogPage.getNeutmatrixInput()).toMatch('neutmatrix');
        trainedModelDialogPage.setModeltypeInput('5');
        expect(trainedModelDialogPage.getModeltypeInput()).toMatch('5');
        trainedModelDialogPage.save();
        expect(trainedModelDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TrainedModelComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-trained-model-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TrainedModelDialogPage {
    modalTitle = element(by.css('h4#myTrainedModelLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    modelNameInput = element(by.css('input#field_modelName'));
    posmatrixInput = element(by.css('input#field_posmatrix'));
    negmatrixInput = element(by.css('input#field_negmatrix'));
    neutmatrixInput = element(by.css('input#field_neutmatrix'));
    modeltypeInput = element(by.css('input#field_modeltype'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setModelNameInput = function(modelName) {
        this.modelNameInput.sendKeys(modelName);
    };

    getModelNameInput = function() {
        return this.modelNameInput.getAttribute('value');
    };

    setPosmatrixInput = function(posmatrix) {
        this.posmatrixInput.sendKeys(posmatrix);
    };

    getPosmatrixInput = function() {
        return this.posmatrixInput.getAttribute('value');
    };

    setNegmatrixInput = function(negmatrix) {
        this.negmatrixInput.sendKeys(negmatrix);
    };

    getNegmatrixInput = function() {
        return this.negmatrixInput.getAttribute('value');
    };

    setNeutmatrixInput = function(neutmatrix) {
        this.neutmatrixInput.sendKeys(neutmatrix);
    };

    getNeutmatrixInput = function() {
        return this.neutmatrixInput.getAttribute('value');
    };

    setModeltypeInput = function(modeltype) {
        this.modeltypeInput.sendKeys(modeltype);
    };

    getModeltypeInput = function() {
        return this.modeltypeInput.getAttribute('value');
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
