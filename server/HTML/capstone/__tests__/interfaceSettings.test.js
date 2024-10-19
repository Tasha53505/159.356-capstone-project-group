// Required code for Jest
const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');

const basicDisplay = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicDisplay.html'), 'utf8');
const basicFormatting = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicFormatting.html'), 'utf8');
const basicTiming = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicTiming.html'), 'utf8');



describe('Interface Settings', () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <div id="prefsSubmit">
            <input name="saveSettings" id="saveSettings" type="submit" class="stdclick" value="Save Settings">
        </div>`; // Reset DOM before each test
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    // See if drop down menu exists and includes value 3
    test('title format dropdown menu exists and has an option of value 3 and text "TRACKNUM. ARTIST - TITLE"', () => {
        const titleFormatMenu = document.getElementById('titleFormatWeb');
        expect(titleFormatMenu).toBeInTheDocument();
        const options = Array.from(titleFormatMenu.options);
        const optionExist = options.some(option => option.value.includes('3'));
        expect(optionExist).toBe(true);
        optionsExist = options.some(option => option.textContent.includes('TRACKNUM. ARTIST - TITLE'));
        expect(optionExist).toBe(true);
    });

    // Min Max values for thumbSize
    test('thumbnail size min value is 25 and max is 250', () => {
        const thumbSize = document.getElementById('thumbSize');
        thumbSize.value = 20;
        expect(thumbSize.validity.valid).toBe(false);

        thumbSize.value = 50;
        expect(thumbSize.validity.valid).toBe(true);

        thumbSize.value = 5000;
        expect(thumbSize.validity.valid).toBe(false);
    });


    // Test save buttons
    test('display basicDisplay save button', () => {
        document.body.innerHTML += `${basicDisplay}`;
        const saveButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveButton).toBeInTheDocument();
    });
    test('display basicFormatting save button', () => {
        document.body.innerHTML += `${basicFormatting}`;
        const saveButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveButton).toBeInTheDocument();
    });
    test('display basicTiming save button', () => {
        document.body.innerHTML += `${basicTiming}`;
        const saveButton = screen.getByRole('button', { name: /Save Settings/i });
        expect(saveButton).toBeInTheDocument();
    });
});