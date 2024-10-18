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
    const testDropdownRetainsValue = (dropdownSelector, expectedValue) => {
      test(`Dropdown "${dropdownSelector}" should retain its value upon save`, () => {
        // Select the dropdown using the provided selector
        const dropdown = screen.getByRole('combobox', { name: dropdownSelector });
  
        // Change the dropdown value to the expected value
        fireEvent.change(dropdown, { target: { value: expectedValue } });
  
        // Simulate clicking the Save button
        const saveButton = screen.getByRole('button', { name: /save/i });
        
        // Spy on functions in the playlistHome module
        const playlistHome = require('../playlistHome');
        jest.spyOn(playlistHome).mockImplementation((form) => {
          // Simulate saving the selected value to localStorage
          localStorage.setItem(dropdownSelector, form[dropdownSelector].value);
        });
  
        fireEvent.click(saveButton); // Trigger the save button click
  
        // Simulate reloading the page or refreshing the dropdown
        document.body.innerHTML = html; // Re-render the HTML
  
        // Load the saved value from localStorage and set the dropdown value
        const savedValue = localStorage.getItem(dropdownSelector);
        dropdown.value = savedValue; // Set the saved value to the dropdown
  
        // Trigger change event to simulate user interaction
        const event = new Event('change', { bubbles: true });
        dropdown.dispatchEvent(event);
  
        // Assert that the displayed value is correct
        expect(dropdown.value).toBe(expectedValue);
        
        // Check that the relevant function was called
        expect(playlistHome.updateLanguageSettingForm).toHaveBeenCalled();
      });
    };
  
    // Define test cases for different dropdowns using selectors
    const dropdownsToTest = [
      { selector: 'Language', value: 'FR' },   // Language dropdown
      { selector: 'Rescan Media', value: 'Clear Library and rescan everything' }, // Rescan Media
      { selector: 'Title Format', value: 'ARTIST - TITLE' }, // Formatting > Title Format
      { selector: 'Use Unified Artists List', value: 'Use single, configurable list of artists' }, // Media Lib management > Browse Artists
    ];
  
    // Loop through the dropdowns and create a test for each
    dropdownsToTest.forEach(({ selector, value }) => {
      testDropdownRetainsValue(selector, value);
    });
  });
  