import { Builder, By, Key } from 'selenium-webdriver';
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';


describe('Settings Page Tests', function () {
    let driver;

    before(async function () {
        // Create a new instance of the Chrome driver
        driver = await new Builder().forBrowser('chrome').build();
        // Open web app
        await driver.get('http://localhost:9000/capstone');
    });

    it('should display the home title', async function () {
        const homeTitle = await driver.findElement(By.css('h2=Home'));
        const isDisplayed = await homeTitle.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it('should open the settings menu when settings button is clicked', async function () {
        const settingsButton = await driver.findElement(By.id('settingsButton'));
        await settingsButton.click();

        const advancedSettingsContent = await driver.findElement(By.css('.advancedSettingsPlugin'));
        const isDisplayed = await advancedSettingsContent.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it('should switch to the Language settings tab', async function () {
        const languageTabButton = await driver.findElement(By.css('.basicSettingsLanguageTabButton'));
        await languageTabButton.click();

        const languageContent = await driver.findElement(By.id('language'));
        const isDisplayed = await languageContent.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it('should change the language and save settings', async function () {
        // Select a different language
        const languageSelect = await driver.findElement(By.id('languageSelect'));
        await languageSelect.sendKeys('Deutsch', Key.RETURN); // Selecting German

        const saveSettingsButton = await driver.findElement(By.id('saveSettings'));
        await saveSettingsButton.click();
    });

    it('should switch to the Media Folders tab', async function () {
        const mediaFoldersTabButton = await driver.findElement(By.css('.basicSettingsMediaFoldersTabButton'));
        await mediaFoldersTabButton.click();

        const mediaFoldersContent = await driver.findElement(By.id('mediaFolders'));
        const isDisplayed = await mediaFoldersContent.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it('should fill in the library name and save it', async function () {
        const libraryNameInput = await driver.findElement(By.id('libraryName'));
        await libraryNameInput.sendKeys('New Library Name');

        const saveLibraryNameButton = await driver.findElement(By.id('libraryNameUpdateButton'));
        await saveLibraryNameButton.click();

        // Add assertions to verify that the library name was saved successfully
    });

    it('should fill in music input path and click Rescan', async function () {
        const musicInputPath = await driver.findElement(By.id('musicInputPath'));
        await musicInputPath.sendKeys('C:\\Path\\To\\Music');

        const rescanButton = await driver.findElement(By.id('rescanButton'));
        await rescanButton.click();

        // Add assertions to verify that the rescan action was triggered successfully
    });

    after(async function () {
        // Close the browser after tests
        await driver.quit();
    });
});
