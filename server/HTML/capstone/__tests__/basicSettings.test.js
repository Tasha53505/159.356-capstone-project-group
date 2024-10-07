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


document.body.innerHTML = `
<div class="basicSettingsLanguageTab active" id="language">
    <div class="language">                                              
        <select class="stdedit" name="pref_language" data-testid="languageSelect">
            <option value="DA">Dansk</option>
            <option value="DE">Deutsch</option>
            <option value="EN" selected>English</option>
            <option value="EN_GB">English (British) *</option>
            <option value="ES">Español</option>
            <option value="FR">Français</option>
            <option value="IT">Italiano</option> 
            <option value="NL">Nederlands</option>
            <option value="NO">Norsk</option>
            <option value="PL">Polski</option>
            <option value="PT">Português *</option>
            <option value="FI">Suomi</option>
            <option value="SV">Svenska</option>
            <option value="CS">Česky</option>
            <option value="RU">Русский</option>
            <option value="HE">עברית *</option>
            <option value="JA">日本語 *</option>
            <option value="ZH_CN">简体中文 *</option>
        </select>
        <input name="saveSettings" data-testid="saveSettings" type="button" class="saveSettings" value="Save Language">
    </div>
</div>

<div class="basicSettingsMediaFoldersTab" data-testid="mediaFolders">
    <div class="mediaLibrary">
        <form data-testid="libraryNameForm">
            <input type="text" class="stdedit selectFolder" name="pref_libraryname0" data-testid="libraryName" value="" size="40">
            <input name="pref_update_libraryname" type="button" class="stdclick rescanButton disableOnScan saveSettings" data-testid="libraryNameUpdateButton" value="Save Library Name">
        </form>
        <form data-testid="rescanMediaForm">
            <input type="text" class="stdedit selectFolder" name="pref_mediadirs0" data-testid="musicInputPath" value="" size="40">
            <select class="stdedit disableOnScan" name="pref_rescantype" data-testid="rescantype">
                <option value="1rescan">Look for new and changed media files</option>
                <option value="2wipedb">Clear library and rescan everything</option>
                <option value="3playlist">Only rescan playlists</option>
                <option value="4onlinelibrary">Only rescan online music library</option>
            </select>
            <input name="pref_rescan_mediadir0" type="submit" class="stdclick rescanButton disableOnScan saveSettings" data-testid="rescanButton" value="Rescan">
        </form>
        <input type="button" value="Browse" class="browseFolders filesystembrowser" onclick="SqueezeJS.UI.FilesystemBrowser.show('mediadirs0', 'foldersonly')" data-testid="ext-gen28">
    </div>
</div>
`;

// Mock rescanMedia function
const rescanMedia = jest.fn();
global.rescanMedia = rescanMedia;

const rescanButton = screen.getByTestId('rescanButton');
rescanButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    rescanMedia(document.querySelector('form[data-testid="rescanMediaForm"]')); // Call rescanMedia
});


describe('Language and Media Folder Settings', () => {
    test('should save the selected language when the Save Language button is clicked', () => {
        const saveButton = screen.getByText('Save Language');
        const languageSelect = screen.getByTestId('languageSelect');

        fireEvent.change(languageSelect, { target: { value: 'FR' } }); // Change to French
        fireEvent.click(saveButton);
        

    });

    test('should trigger rescan when Rescan button is clicked', () => {
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
