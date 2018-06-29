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

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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
