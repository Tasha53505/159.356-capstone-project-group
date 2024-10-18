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
    test("All Settings should retain their DISPLAY value in their dropdown box upon save", () => {
      // Select the dropdown
      const languageSelect = screen.getByTestId('languageSelect');
  
      // Change the dropdown value to French
      fireEvent.change(languageSelect, { target: { value: 'FR' } });
  
      // Simulate clicking the Save button
      const saveButton = screen.getByRole('button', { name: /save language/i });
      
      // Mock the updateLanguageSettingForm function
      jest.spyOn(require('../playlistHome'), 'updateLanguageSettingForm').mockImplementation((form) => {
        // Simulate saving the selected value to localStorage
        localStorage.setItem('selectedLanguage', form['pref_language'].value);
    });
    
  
      fireEvent.click(saveButton); // Trigger the save button click
  
      // Simulate reloading the page or refreshing the dropdown
      document.body.innerHTML = html; // Re-render the HTML
  
      // Load the saved value from localStorage and set the dropdown value
      const savedLanguage = localStorage.getItem('selectedLanguage');
      languageSelect.value = savedLanguage; // Set the saved value to the dropdown
  
      // Trigger change event to simulate user interaction
      const event = new Event('change', { bubbles: true });
      languageSelect.dispatchEvent(event);
  
      // Assert that the displayed value is correct
      expect(languageSelect.value).toBe('FR');
    });
  });