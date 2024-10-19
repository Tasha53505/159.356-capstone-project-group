// Required code for Jest
const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const advanceFormatting = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedFormatting.html'), 'utf8');


describe('Interface Settings', () => {
    beforeEach(() => {
        document.body.innerHTML += `${advanceFormatting}
        <div id="prefsSubmit">
            <input name="saveSettings" id="saveSettings" type="submit" class="stdclick" value="Save Settings">
        </div>`;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test button
    test('displays save button for formatting', () => {
        const saveButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveButton).toBeInTheDocument();
    });

    // Test to see if preference in code
    test('Renders formatting properly', () => {
        const inputs = screen.queryAllByRole('textbox');
        const input = inputs.find(input => input.name === 'pref_coverArt');
        expect(input).toBeInTheDocument();
    })
});