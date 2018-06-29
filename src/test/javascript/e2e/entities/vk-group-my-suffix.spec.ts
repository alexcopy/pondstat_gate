import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('VkGroup e2e test', () => {

    let navBarPage: NavBarPage;
    let vkGroupDialogPage: VkGroupDialogPage;
    let vkGroupComponentsPage: VkGroupComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().loginWithOAuth('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load VkGroups', () => {
        navBarPage.goToEntity('vk-group-my-suffix');
        vkGroupComponentsPage = new VkGroupComponentsPage();
        expect(vkGroupComponentsPage.getTitle())
            .toMatch(/gateApp.vkGroup.home.title/);

    });

    it('should load create VkGroup dialog', () => {
        vkGroupComponentsPage.clickOnCreateButton();
        vkGroupDialogPage = new VkGroupDialogPage();
        expect(vkGroupDialogPage.getModalTitle())
            .toMatch(/gateApp.vkGroup.home.createOrEditLabel/);
        vkGroupDialogPage.close();
    });

    it('should create and save VkGroups', () => {
        vkGroupComponentsPage.clickOnCreateButton();
        vkGroupDialogPage.setGroupidInput('5');
        expect(vkGroupDialogPage.getGroupidInput()).toMatch('5');
        vkGroupDialogPage.setNameInput('name');
        expect(vkGroupDialogPage.getNameInput()).toMatch('name');
        vkGroupDialogPage.setScreennameInput('screenname');
        expect(vkGroupDialogPage.getScreennameInput()).toMatch('screenname');
        vkGroupDialogPage.setTypeInput('type');
        expect(vkGroupDialogPage.getTypeInput()).toMatch('type');
        vkGroupDialogPage.setIsclosedInput('5');
        expect(vkGroupDialogPage.getIsclosedInput()).toMatch('5');
        vkGroupDialogPage.setProcInput('5');
        expect(vkGroupDialogPage.getProcInput()).toMatch('5');
        vkGroupDialogPage.setProcusersInput('5');
        expect(vkGroupDialogPage.getProcusersInput()).toMatch('5');
        vkGroupDialogPage.setUsersqtyInput('5');
        expect(vkGroupDialogPage.getUsersqtyInput()).toMatch('5');
        vkGroupDialogPage.setUsersaddedInput('5');
        expect(vkGroupDialogPage.getUsersaddedInput()).toMatch('5');
        vkGroupDialogPage.setIgnoreInput('5');
        expect(vkGroupDialogPage.getIgnoreInput()).toMatch('5');
        vkGroupDialogPage.setStateProvinceInput('stateProvince');
        expect(vkGroupDialogPage.getStateProvinceInput()).toMatch('stateProvince');
        vkGroupDialogPage.save();
        expect(vkGroupDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class VkGroupComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-vk-group-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class VkGroupDialogPage {
    modalTitle = element(by.css('h4#myVkGroupLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    groupidInput = element(by.css('input#field_groupid'));
    nameInput = element(by.css('input#field_name'));
    screennameInput = element(by.css('input#field_screenname'));
    typeInput = element(by.css('input#field_type'));
    isclosedInput = element(by.css('input#field_isclosed'));
    procInput = element(by.css('input#field_proc'));
    procusersInput = element(by.css('input#field_procusers'));
    usersqtyInput = element(by.css('input#field_usersqty'));
    usersaddedInput = element(by.css('input#field_usersadded'));
    ignoreInput = element(by.css('input#field_ignore'));
    stateProvinceInput = element(by.css('input#field_stateProvince'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setGroupidInput = function(groupid) {
        this.groupidInput.sendKeys(groupid);
    };

    getGroupidInput = function() {
        return this.groupidInput.getAttribute('value');
    };

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setScreennameInput = function(screenname) {
        this.screennameInput.sendKeys(screenname);
    };

    getScreennameInput = function() {
        return this.screennameInput.getAttribute('value');
    };

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    };

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    };

    setIsclosedInput = function(isclosed) {
        this.isclosedInput.sendKeys(isclosed);
    };

    getIsclosedInput = function() {
        return this.isclosedInput.getAttribute('value');
    };

    setProcInput = function(proc) {
        this.procInput.sendKeys(proc);
    };

    getProcInput = function() {
        return this.procInput.getAttribute('value');
    };

    setProcusersInput = function(procusers) {
        this.procusersInput.sendKeys(procusers);
    };

    getProcusersInput = function() {
        return this.procusersInput.getAttribute('value');
    };

    setUsersqtyInput = function(usersqty) {
        this.usersqtyInput.sendKeys(usersqty);
    };

    getUsersqtyInput = function() {
        return this.usersqtyInput.getAttribute('value');
    };

    setUsersaddedInput = function(usersadded) {
        this.usersaddedInput.sendKeys(usersadded);
    };

    getUsersaddedInput = function() {
        return this.usersaddedInput.getAttribute('value');
    };

    setIgnoreInput = function(ignore) {
        this.ignoreInput.sendKeys(ignore);
    };

    getIgnoreInput = function() {
        return this.ignoreInput.getAttribute('value');
    };

    setStateProvinceInput = function(stateProvince) {
        this.stateProvinceInput.sendKeys(stateProvince);
    };

    getStateProvinceInput = function() {
        return this.stateProvinceInput.getAttribute('value');
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
