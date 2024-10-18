const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');
const { updateLanguageSettingForm } = require('../playlistHome'); // Adjust this path


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
    const testDropdownRetainsValue = (dropdownTestId, expectedValue) => {
      test(`Dropdown with test ID "${dropdownTestId}" should retain its value upon save`, () => {
        // Select the dropdown
        const dropdown = screen.getByTestId(dropdownTestId);
  
        // Change the dropdown value to the expected value
        fireEvent.change(dropdown, { target: { value: expectedValue } });
  
        // Simulate clicking the Save button
        const saveButton = screen.getByRole('button', { name: /save/i }); // Adjust button name if necessary
  
        // Mock the updateLanguageSettingForm function
        jest.spyOn(require('../playlistHome'), 'updateLanguageSettingForm').mockImplementation((form) => {
          // Simulate saving the selected value to localStorage
          localStorage.setItem(dropdownTestId, form[dropdownTestId].value);
        });
  
        fireEvent.click(saveButton); // Trigger the save button click
  
        // Simulate reloading the page or refreshing the dropdown
        document.body.innerHTML = html; // Re-render the HTML
  
        // Load the saved value from localStorage and set the dropdown value
        const savedValue = localStorage.getItem(dropdownTestId);
        dropdown.value = savedValue; // Set the saved value to the dropdown
  
        // Trigger change event to simulate user interaction
        const event = new Event('change', { bubbles: true });
        dropdown.dispatchEvent(event);
  
        // Assert that the displayed value is correct
        expect(dropdown.value).toBe(expectedValue);
      });
    };
  
    // Define test cases for different dropdowns
    testDropdownRetainsValue('languageSelect', 'FR'); // Example dropdown ID and expected state
  
  });
  