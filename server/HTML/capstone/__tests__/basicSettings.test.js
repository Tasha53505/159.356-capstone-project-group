// languageAndMediaSettings.test.js
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');



// Mocking any global functions that are used in your code
global.SqueezeJS = {
    UI: {
        FilesystemBrowser: {
            show: jest.fn()
        }
    }
};



beforeEach(() => {
    document.body.innerHTML = html;  // Reset DOM before each test
    

});



describe('Language and Media Folder Settings', () => {
    test('should save the selected language when the Save Language button is clicked', () => {
        const saveButton = screen.getByText('Save Language');
        const languageSelect = screen.getByTestId('languageSelect');

        fireEvent.change(languageSelect, { target: { value: 'FR' } }); // Change to German
        fireEvent.click(saveButton);
        

    });

    test('should trigger rescan when Rescan button is clicked', () => {
        const rescanButton = screen.getByText('Rescan');
        const rescanForm = screen.getByTestId('rescanMediaForm');

        fireEvent.change(screen.getByTestId('musicInputPath'), { target: { value: '/path/to/music' } });
        fireEvent.click(rescanButton);
        
        // Assert the functionality for rescanning media
        expect(rescanMedia).toHaveBeenCalled();
    });

    test('should open the file browser when Browse button is clicked', () => {
        const browseButton = screen.getByText('Browse');
        
        fireEvent.click(browseButton);

        // Assert that the filesystem browser was opened
        expect(SqueezeJS.UI.FilesystemBrowser.show).toHaveBeenCalledWith('mediadirs0', 'foldersonly');
    });
});
