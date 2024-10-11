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

    // Test each of the buttons
    test('displays button for artwork', () => {
        const saveButton = screen.getByRole('button', { name: /Save Default Artwork/i });
        expect(saveButton).toBeInTheDocument();
    });

    test('displays button for artwork folder', () => {
        const saveButton = screen.getByRole('button', { name: /Save Artwork Folder/i });
        expect(saveButton).toBeInTheDocument();
    });
});