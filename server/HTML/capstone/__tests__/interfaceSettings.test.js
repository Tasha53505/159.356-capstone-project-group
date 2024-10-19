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
        document.body.innerHTML +=`
        <div class="tooltipDrowndown">     
            <div class="tooltipContainer">
                <div class="whatIsThis" style="display: flex; align-items: center; gap: 0.5em;">
                    <h4 style="display: inline-block; vertical-align: middle;">Title Format</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="help-icon" style="display: inline-block; vertical-align: middle;">
                        <path fill="currentColor" d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                    </svg>  
                </div>
                    <div class="tooltip">  
                        These are the formats available for selection both in the web interface and on players. 
                    </div>
             </div>
            <div class="prefs">
                 <form id="titleFormatWebForm" class="">
                    <select class="stdedit" name="pref_titleFormatWeb" id="titleFormatWeb">
                        <option value="0">TITLE</option>
                        <option value="1">DISC-TRACKNUM. TITLE</option>
                        <option value="2">TRACKNUM. TITLE</option>
                        <option value="3">TRACKNUM. ARTIST - TITLE</option>
                        <option value="4">TRACKNUM. TITLE (ARTIST)</option>
                        <option value="5">TRACKNUM. TITLE - ARTIST - ALBUM</option>
                        <option value="6">TRACKNUM. TITLE from ALBUM by ARTIST</option>
                        <option value="7">TITLE (ARTIST)</option>
                        <option value="8">ARTIST - TITLE</option>
                    </select><br><br>
                    <input name="pref_update_titleFormatWeb" type="button" class="stdclick rescanButton disableOnScan saveSettings" id="titleFormatWebUpdateButton" onclick="titleFormatWebForm(this.form); return false;"  value="Save Title Format"><br><br>
                </form>
            </div>
        </div>  
        `
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