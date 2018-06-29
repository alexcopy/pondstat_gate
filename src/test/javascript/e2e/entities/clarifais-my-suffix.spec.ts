import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Clarifais e2e test', () => {

    let navBarPage: NavBarPage;
    let clarifaisDialogPage: ClarifaisDialogPage;
    let clarifaisComponentsPage: ClarifaisComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Clarifais', () => {
        navBarPage.goToEntity('clarifais-my-suffix');
        clarifaisComponentsPage = new ClarifaisComponentsPage();
        expect(clarifaisComponentsPage.getTitle())
            .toMatch(/gateApp.clarifais.home.title/);

    });

    it('should load create Clarifais dialog', () => {
        clarifaisComponentsPage.clickOnCreateButton();
        clarifaisDialogPage = new ClarifaisDialogPage();
        expect(clarifaisDialogPage.getModalTitle())
            .toMatch(/gateApp.clarifais.home.createOrEditLabel/);
        clarifaisDialogPage.close();
    });

    it('should create and save Clarifais', () => {
        clarifaisComponentsPage.clickOnCreateButton();
        clarifaisDialogPage.setNameInput('name');
        expect(clarifaisDialogPage.getNameInput()).toMatch('name');
        clarifaisDialogPage.setEmailInput('email');
        expect(clarifaisDialogPage.getEmailInput()).toMatch('email');
        clarifaisDialogPage.setEmailpasswordInput('emailpassword');
        expect(clarifaisDialogPage.getEmailpasswordInput()).toMatch('emailpassword');
        clarifaisDialogPage.setApikeyInput('apikey');
        expect(clarifaisDialogPage.getApikeyInput()).toMatch('apikey');
        clarifaisDialogPage.setModelnameInput('modelname');
        expect(clarifaisDialogPage.getModelnameInput()).toMatch('modelname');
        clarifaisDialogPage.setCountryInput('country');
        expect(clarifaisDialogPage.getCountryInput()).toMatch('country');
        clarifaisDialogPage.setBilldayInput('billday');
        expect(clarifaisDialogPage.getBilldayInput()).toMatch('billday');
        clarifaisDialogPage.setTotalusageInput('5');
        expect(clarifaisDialogPage.getTotalusageInput()).toMatch('5');
        clarifaisDialogPage.setCountInput('5');
        expect(clarifaisDialogPage.getCountInput()).toMatch('5');
        clarifaisDialogPage.save();
        expect(clarifaisDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ClarifaisComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-clarifais-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ClarifaisDialogPage {
    modalTitle = element(by.css('h4#myClarifaisLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    emailInput = element(by.css('input#field_email'));
    emailpasswordInput = element(by.css('input#field_emailpassword'));
    apikeyInput = element(by.css('input#field_apikey'));
    modelnameInput = element(by.css('input#field_modelname'));
    countryInput = element(by.css('input#field_country'));
    billdayInput = element(by.css('input#field_billday'));
    totalusageInput = element(by.css('input#field_totalusage'));
    countInput = element(by.css('input#field_count'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    };

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    };

    setEmailpasswordInput = function(emailpassword) {
        this.emailpasswordInput.sendKeys(emailpassword);
    };

    getEmailpasswordInput = function() {
        return this.emailpasswordInput.getAttribute('value');
    };

    setApikeyInput = function(apikey) {
        this.apikeyInput.sendKeys(apikey);
    };

    getApikeyInput = function() {
        return this.apikeyInput.getAttribute('value');
    };

    setModelnameInput = function(modelname) {
        this.modelnameInput.sendKeys(modelname);
    };

    getModelnameInput = function() {
        return this.modelnameInput.getAttribute('value');
    };

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    };

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    };

    setBilldayInput = function(billday) {
        this.billdayInput.sendKeys(billday);
    };

    getBilldayInput = function() {
        return this.billdayInput.getAttribute('value');
    };

    setTotalusageInput = function(totalusage) {
        this.totalusageInput.sendKeys(totalusage);
    };

    getTotalusageInput = function() {
        return this.totalusageInput.getAttribute('value');
    };

    setCountInput = function(count) {
        this.countInput.sendKeys(count);
    };

    getCountInput = function() {
        return this.countInput.getAttribute('value');
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
