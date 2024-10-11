// Required code for Jest
const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Interface Settings', () => {
    beforeEach(() => {
        document.body.innerHTML = html;
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

    // Test one button for each panel
    test('displays button for updating items per page', () => {
        const updateButton = screen.getByRole('button', { name: /Update Items Per Page/i });
        expect(updateButton).toBeInTheDocument();
    });

    test('displays button for adding custom formats', () => {
        const updateButton = screen.getByRole('button', { name: /Add Custom Format/i });
        expect(updateButton).toBeInTheDocument();
    });

    test('displays button for refresh rate', () => {
        const updateButton = screen.getByRole('button', { name: /Change Refresh Rate/i });
        expect(updateButton).toBeInTheDocument();
    });
});