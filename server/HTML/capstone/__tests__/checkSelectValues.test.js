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


describe('Dropdown Boxes retain value upon save (simulates clicking save, refreshing and seeing expected value)', () => {
    test('All dropdowns should retain their value upon save', () => {
        // Select all dropdown elements initially
        const dropdowns = document.querySelectorAll('select.stdedit');

        // Store the initial state and simulate changes
        dropdowns.forEach((dropdown, index) => {
            console.log(`Processing dropdown ${index + 1}: ${dropdown.name}`);

            // Get a new value for this dropdown (change to the next option)
            const newValue = dropdown.options[(dropdown.selectedIndex + 1) % dropdown.options.length].value;

            // Simulate a change in the dropdown
            fireEvent.change(dropdown, { target: { value: newValue } });

            // Save the new value to localStorage
            localStorage.setItem(dropdown.name, newValue);
        });

        // Refresh the document body to simulate reloading
        document.body.innerHTML = html; // Reloading the HTML

        // Re-select all dropdowns after reload
        const reloadedDropdowns = document.querySelectorAll('select.stdedit');

        // Collect all results before making assertions (This makes sure it checks all vlaues)
        const results = [];
        reloadedDropdowns.forEach((dropdown, index) => {
            const name = dropdown.name;
            const expectedValue = localStorage.getItem(name);
            const actualValue = dropdown.value;

            // Log the expected and actual values for each dropdown
            console.log(`Dropdown "${name}" - Expected Value: ${expectedValue}, Actual Value: ${actualValue}`);

            // Store the result in the array
            results.push({ name, expectedValue, actualValue });
        });

        // Now assert that all dropdowns have the expected value
        results.forEach(({ name, expectedValue, actualValue }) => {
            expect(actualValue).toBe(expectedValue); // Check against localStorage
        });
    });
});
