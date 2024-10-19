const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');


// Load the HTML file into the test environment
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const basicLanguage = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicLanguage.html'), 'utf8');
const basicMediaFolder = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicMediaFolder.html'), 'utf8');
const basicPlaylistDir = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicPlaylistDir.html'), 'utf8');


//TODO Uncomment all of this out when merging to main

// const basicDisplay = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicDisplay.html'), 'utf8');
// const basicInterface = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicInterface.html'), 'utf8');
// const basicTiming = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicTiming.html'), 'utf8');
// const basicBrowseArtists = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicBrowseArtists.html'), 'utf8');
// const basicReleaseTypes = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicReleaseTypes.html'), 'utf8');
// const basicFilters = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicFilters.html'), 'utf8');
// const basicPlaylists = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/basicPlaylists.html'), 'utf8');


// const advancedMediaLibraryManagement = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedMediaLibraryManagement.html'), 'utf8');
// const advancedFileTypes = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedFileTypes.html'), 'utf8');
// const advancedFormatting = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedFormatting.html'), 'utf8');
// const advancedLmsStatus = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedLmsStatus.html'), 'utf8');
// const advancedNetwork = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedNetwork.html'), 'utf8');
// const advancedPerformance = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedPerformance.html'), 'utf8');
// const advancedSecurity = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedSecurity.html'), 'utf8');
// const advancedSoftwareUpdate = fs.readFileSync(path.resolve(__dirname, '../../../Slim/Plugin/CapstoneSettings/HTML/EN/plugins/CapstoneSettings/advancedSoftwareUpdate.html'), 'utf8');

// Add the HTML content to the document body before each test
beforeEach(() => {
    localStorage.clear(); //Clear local storage before each test
    document.body.innerHTML = `${basicLanguage}${basicMediaFolder}${basicPlaylistDir}`;
    //TODO UNCOMMENT THIS
     // document.body.innerHTML = `${basicLanguage}${basicMediaFolder}${basicPlaylistDir}${basicDisplay}${basicInterface}${basicTiming}${basicBrowseArtists}${basicReleaseTypes}${basicFilters}${basicPlaylists}${advancedMediaLibraryManagement}${advancedFileTypes}${advancedFormatting}${advancedLmsStatus}${advancedNetwork}${advancedPerformance}${advancedSecurity}${advancedSoftwareUpdate}`;

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
                fireEvent.click(saveButton);

                // Simulate saving the selection to local storage
                localStorage.setItem(dropdown.name, newOption.value);

                // Reload the page (re-render the HTML)
                document.body.innerHTML = `${basicLanguage}${basicMediaFolder}${basicPlaylistDir}`;

                // Re-select the dropdowns after re-rendering by class
                const updatedDropdowns = Array.from(document.querySelectorAll('.stdedit')).filter(el => el.tagName === 'SELECT');

                // Log expected and actual values
                console.log(`Dropdown ${index + 1}: Expected Value = ${newOption.value}, Actual Value = ${updatedDropdowns[index].value}`);

                // Assert the value is retained
                expect(updatedDropdowns[index].value).toBe(newOption.value);
            }
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