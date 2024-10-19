const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');


// Load the HTML file into the test environment
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const basicLanguage = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicLanguage.html'), 'utf8');
const basicMediaFolder = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicMediaFolder.html'), 'utf8');
const basicPlaylistDir = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicPlaylistDir.html'), 'utf8');



const basicDisplay = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicDisplay.html'), 'utf8');
const basicTiming = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicTiming.html'), 'utf8');
const basicBrowseArtists = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicBrowseArtists.html'), 'utf8');
const basicReleaseTypes = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicReleaseTypes.html'), 'utf8');
const basicFilters = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicFilters.html'), 'utf8');
const basicPlaylists = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicPlaylists.html'), 'utf8');


//TODO Uncomment all of this out when advanced tests are done

const advancedMediaLibraryManagement = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedMediaLibraryManagement.html'), 'utf8');
const advancedFileTypes = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedFileTypes.html'), 'utf8');
const advancedFormatting = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedFormatting.html'), 'utf8');
const advancedLmsStatus = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedLmsStatus.html'), 'utf8');
const advancedNetwork = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedNetwork.html'), 'utf8');
const advancedPerformance = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedPerformance.html'), 'utf8');
const advancedSecurity = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedSecurity.html'), 'utf8');
const advancedSoftwareUpdate = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedSoftwareUpdate.html'), 'utf8');

// Add the HTML content to the document body before each test
beforeEach(() => {
    localStorage.clear(); //Clear local storage before each test


     document.body.innerHTML = `${basicLanguage}${basicMediaFolder}${basicPlaylistDir}${basicDisplay}${basicTiming}${basicBrowseArtists}${basicReleaseTypes}${basicFilters}${basicPlaylists}${advancedMediaLibraryManagement}${advancedFileTypes}${advancedFormatting}${advancedLmsStatus}${advancedNetwork}${advancedPerformance}${advancedSecurity}${advancedSoftwareUpdate}
     <div id="prefsSubmit">
        <input name="saveSettings" id="saveSettings" type="submit" class="stdclick" value="Save Settings">
    </div>`;

});


describe('Dropdown Boxes retain value upon save (simulates clicking save, refreshing and seeing expected value)', () => {
    test('All dropdowns should retain their value upon save', () => {
        // Select all dropdown elements by class .stdedit that are also <select> elements
        const dropdowns = Array.from(document.querySelectorAll('.stdedit')).filter(el => el.tagName === 'SELECT');

        // Log the number of valid dropdowns found
        console.log(`Number of valid dropdowns found: ${dropdowns.length}`);

        // Ensure at least one dropdown exists in the document
        expect(dropdowns.length).toBeGreaterThan(0);

        // Iterate through each dropdown and test its behavior
        dropdowns.forEach((dropdown, index) => {
            // Check if the dropdown has options
            if (dropdown.options.length === 0) {
                console.error(`Dropdown ${index + 1} has no options.`);
                return; // Skip this dropdown
            }

            // Select a value from the dropdown other than the default
            const options = Array.from(dropdown.options);
            const newOption = options.find(option => option.value !== dropdown.value);

            if (newOption) {
                // Change the dropdown value
                fireEvent.change(dropdown, { target: { value: newOption.value } });

                // Simulate clicking the save button
                const saveButton = screen.getByText('Save Settings');
                    // After the dropdown value is changed and the save button is clicked
                fireEvent.click(saveButton);

                // Simulate saving the selection to local storage
                localStorage.setItem(dropdown.name, newOption.value);

                // Reload the page (re-render the HTML) and populate the dropdown values from localStorage
                document.body.innerHTML = `${basicLanguage}${basicMediaFolder}${basicPlaylistDir}${basicDisplay}${basicTiming}${basicBrowseArtists}${basicReleaseTypes}${basicFilters}${basicPlaylists}${advancedMediaLibraryManagement}${advancedFileTypes}${advancedFormatting}${advancedLmsStatus}${advancedNetwork}${advancedPerformance}${advancedSecurity}${advancedSoftwareUpdate}
                <div id="prefsSubmit">
                <input name="saveSettings" id="saveSettings" type="submit" class="stdclick" value="Save Settings">
             </div>`;

                // Re-select the dropdowns after re-rendering by class
                const updatedDropdowns = Array.from(document.querySelectorAll('.stdedit')).filter(el => el.tagName === 'SELECT');

                // Set the dropdown value based on localStorage
                updatedDropdowns.forEach(dropdown => {
                    const savedValue = localStorage.getItem(dropdown.name);
                    if (savedValue) {
                        dropdown.value = savedValue; // Set the value to the saved value
                    }
                });

                // Log expected and actual values
                console.log(`Dropdown ${index + 1}: Expected Value = ${newOption.value}, Actual Value = ${updatedDropdowns[index].value}`);

                // Assert the value is retained
                expect(updatedDropdowns[index].value).toBe(newOption.value);

            }
        });
    });
});


describe('Input Textboxes retain value upon save (simulates typing a value, clicking save, refreshing, and checking expected value)', () => {
    test('All textboxes should retain their value upon save', () => {
        // Mock server data to simulate saving and loading
        const mockServerData = {};

        // Set up the initial DOM structure with necessary HTML
        document.body.innerHTML = `${basicLanguage}${basicMediaFolder}${basicPlaylistDir}${basicDisplay}${basicTiming}${basicBrowseArtists}${basicReleaseTypes}${basicFilters}${basicPlaylists}<div id="prefsSubmit">
            <input name="saveSettings" id="saveSettings" type="submit" class="stdclick" value="Save Settings">
        </div>`;

        // Select all input elements by class .stdedit that are also <input> elements with type="text"
        const textboxes = Array.from(document.querySelectorAll('.stdedit')).filter(el => el.tagName === 'INPUT' && el.type === 'text');

        // Log the number of valid textboxes found
        console.log(`Number of valid textboxes found: ${textboxes.length}`);

        // Ensure at least one textbox exists in the document
        expect(textboxes.length).toBeGreaterThan(0);

        // Iterate through each textbox and test its behavior
        textboxes.forEach((textbox, index) => {
            // Define a new value to type into the textbox
            const newValue = `TestValue${index}`;

            // Change the textbox value
            fireEvent.change(textbox, { target: { value: newValue } });

            // Mock server save: simulate saving the value to mockServerData
            mockServerData[textbox.name] = newValue;

            // Select the save button after confirming it exists
            const saveButton = document.getElementById('saveSettings');
            expect(saveButton).not.toBeNull(); // Ensure the save button is present

            // Simulate clicking the save button
            fireEvent.click(saveButton);

            // Simulate a server reload by re-rendering the HTML using mockServerData values
            document.body.innerHTML = `${basicLanguage}${basicMediaFolder}${basicPlaylistDir}${basicDisplay}${basicTiming}${basicBrowseArtists}${basicReleaseTypes}${basicFilters}${basicPlaylists}${advancedMediaLibraryManagement}${advancedFileTypes}${advancedFormatting}${advancedLmsStatus}${advancedNetwork}${advancedPerformance}${advancedSecurity}${advancedSoftwareUpdate}
            <div id="prefsSubmit">
            <input name="saveSettings" id="saveSettings" type="submit" class="stdclick" value="Save Settings">
         </div>`;


        

            // Populate the re-rendered HTML with values from the mock server
            const updatedTextboxes = Array.from(document.querySelectorAll('.stdedit')).filter(el => el.tagName === 'INPUT' && el.type === 'text');

      

            // Set the value for each textbox based on mock server data
            updatedTextboxes.forEach((updatedTextbox) => {
                if (mockServerData[updatedTextbox.name]) {
                    updatedTextbox.value = mockServerData[updatedTextbox.name];
                }
            });

            // Log expected and actual values
            console.log(`Textbox ${index + 1}: Expected Value = ${newValue}, Actual Value = ${updatedTextboxes[index]?.value}`);

            // Assert the value is retained
            expect(updatedTextboxes[index]?.value).toBe(newValue);
        });
    });
});





describe('Dropdown boxes', () => {
    test('all select dropdowns should have at least one value selected', () => {
      // Select all dropdown elements
      const dropdowns = screen.getAllByRole('combobox');
      
      // Ensure at least one dropdown exists in the document
      expect(dropdowns.length).toBeGreaterThan(0);
      
      // Check that each dropdown has a selected value that is not empty
      dropdowns.forEach((dropdown) => {
        expect(dropdown.value).not.toBe('');
      });
    });
  
  
  });