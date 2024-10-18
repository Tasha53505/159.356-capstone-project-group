const fs = require('fs');
const path = require('path');
const { screen } = require('@testing-library/dom');
require('@testing-library/jest-dom');

// Load the HTML file into the test environment
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

// Add the HTML content to the document body before each test (Otherwise ERROR will occur wheere it can't find any ids)
beforeEach(() => {
  document.body.innerHTML = html;
});

describe('Language dropdown', () => {
  test('should have at least one value selected', () => {
    // Select the dropdown element by its data-testid
    const languageSelect = screen.getByTestId('languageSelect');
    
    // Check if the dropdown exists
    expect(languageSelect).toBeInTheDocument();
    
    // Check if the selected value is not empty (meaning there's a selection)
    expect(languageSelect.value).not.toBe('');
  });
});
