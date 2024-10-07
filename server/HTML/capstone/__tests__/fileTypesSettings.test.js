const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');


// Load the HTML file into the test environment
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');




describe('Advanced Settings Media Library Management Form', () => {

    beforeEach(() => {
        document.body.innerHTML = html;  // Reset DOM before each test
    });

    test('renders the AAC select dropdown and its initial state', () => {
        const aacSelect = document.getElementById('aac-aac-*-*');
        expect(aacSelect).toBeInTheDocument();
        expect(aacSelect.value).toBe('NATIVE');
    });
    
    test('renders the FLAC select dropdown and its initial state', () => {
        const flacSelect = document.getElementById('aac-flc-*-*');
        expect(flacSelect).toBeInTheDocument();
        expect(flacSelect.value).toBe('faad/flac');
    });
    
    test('renders the MP3 select dropdown and its initial state', () => {
        const mp3Select = document.getElementById('aac-mp3-*-*');
        expect(mp3Select).toBeInTheDocument();
        expect(mp3Select.value).toBe('faad/lame');
    });
    
    // Don't need to test all of them.
});