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