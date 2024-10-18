const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');
const javascriptFile = require('../playlistHome'); // Adjust this path


// Load the HTML file into the test environment
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

// Add the HTML content to the document body before each test
beforeEach(() => {
    localStorage.clear(); //Clear local storage before each test
  document.body.innerHTML = html;
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



describe('Dropdown Boxes retain value upon save', () => {
    test('All dropdowns should retain their selected value upon save', () => {
        // Select all dropdown elements
        const dropdowns = screen.getAllByRole('combobox');

        dropdowns.forEach((dropdown) => {
            const originalValue = dropdown.value; // Store the original value
            
            // Change the dropdown value to the first option (or any value you want)
            fireEvent.change(dropdown, { target: { value: dropdown.options[1].value } }); // Choose the second option for testing

            // Simulate clicking the Save button
            const saveButtons = screen.getAllByRole('button', { name: /save/i });
            const saveButton = saveButtons[0]; // Assuming the first save button is relevant

            // Spy on the module functions
            const playlistHome = require('../playlistHome');
            jest.spyOn(playlistHome, 'updateLanguageSettingForm').mockImplementation((form) => {
                // Simulate saving the selected value to localStorage
                localStorage.setItem(dropdown.dataset.testid, form[dropdown.dataset.testid].value);
            });

            // Save the dropdown value
            fireEvent.click(saveButton); // Trigger the save button click

            // Simulate reloading the page or refreshing the dropdown
            document.body.innerHTML = html; // Re-render the HTML

            // Load the saved value from localStorage and set the dropdown value
            const savedValue = localStorage.getItem(dropdown.dataset.testid);
            dropdown.value = savedValue; // Set the saved value to the dropdown

            // Trigger change event to simulate user interaction
            const event = new Event('change', { bubbles: true });
            dropdown.dispatchEvent(event);

            // Assert that the displayed value is the same as the one saved
            expect(dropdown.value).toBe(dropdown.options[1].value); // Check if it retains the new value
        });
    });
});