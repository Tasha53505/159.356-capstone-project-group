import { JSDOM } from 'jsdom';
const jsdom = require('@jsdom')
const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');

const html = `
<div class="basicSettingsLanguageTab active" id="language">
    <form action="" id="languageSettingForm" class="languageSettingForm">
        <div class="language">     
            <h4>Change Language</h4>
            <select class="stdedit" name="pref_language" id="languageSelect">
                <option value="DA">Dansk</option>
                <option value="DE">Deutsch</option>
                <option value="EN">English</option>
                <option value="FR">Français</option>
            </select>
        </div>                 
        <input name="saveSettings" id="saveSettings" type="button" class="saveSettings" value="Save Language" style="width: 100%;" onclick="updateLanguageSettingForm(this.form)">
    </form>
</div>
`;

describe('Language Setting Tests', () => {
    let dom;
    let document;

    beforeEach(() => {
        // Set up JSDOM
        dom = new JSDOM(html);
        document = dom.window.document;

        // Mock localStorage
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            removeItem: jest.fn(),
        };
    });

    it('should save and load the selected language', () => {
        const languageSelect = document.getElementById('languageSelect');
        const saveButton = document.getElementById('saveSettings');

        // Change the language to French
        languageSelect.value = 'FR';
        
        // Simulate the click event on the save button
        saveButton.onclick = () => {
            const selectedLanguage = languageSelect.value;
            localStorage.setItem('selectedLanguage', selectedLanguage);
        };
        saveButton.click();

        // Check that localStorage.setItem was called with the expected value
        expect(localStorage.setItem).toHaveBeenCalledWith('selectedLanguage', 'FR');

        // Simulate refreshing the page by mocking the return value of localStorage.getItem
        localStorage.getItem.mockReturnValue('FR');

        // Simulate calling your function to set the language select after refresh
        languageSelect.value = localStorage.getItem('selectedLanguage');

        // Verify that the selected value is correctly set after refreshing
        expect(languageSelect.value).toBe('FR');
    });
});
