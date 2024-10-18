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


// Get all select elements and test their values upon refresh
describe('Dropdown Boxes retain value upon save', () => {
    test('All dropdowns should retain their value upon save', () => {
        // Select all dropdown elements
        const dropdowns = document.querySelectorAll('select.stdedit');

        // Store the names of dropdowns to be checked after the HTML reload
        const dropdownNames = Array.from(dropdowns).map(dropdown => dropdown.name);

        dropdowns.forEach((dropdown, index) => {
            console.log(`Processing dropdown ${index + 1}: ${dropdown.name}`);

            const newValue = dropdown.options[(dropdown.selectedIndex + 1) % dropdown.options.length].value; // Change to next option

            // Simulate a change in the dropdown
            fireEvent.change(dropdown, { target: { value: newValue } });

            // Save the new value to localStorage
            localStorage.setItem(dropdown.name, newValue);
        });

        // Refresh the document body to simulate reloading
        document.body.innerHTML = html; // Reloading the HTML

        // Re-select the dropdowns after reload
        dropdownNames.forEach(name => {
            const reloadedDropdown = document.querySelector(`select[name="${name}"]`);
            // Check if the value persists
            expect(reloadedDropdown.value).toBe(localStorage.getItem(name)); // Check against localStorage
        });
    });
});
