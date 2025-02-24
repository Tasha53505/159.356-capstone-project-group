// __tests__/leftPanelUiInteractions.test.js
/**
 * @jest-environment jsdom
 *
*/

// --------------------------------------------------------------------
// ------------------------ Testing Accordion Panels ----------------------
// --------------------------------------------------------------------
const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');


// Load the HTML file into the test environment
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('Accordion Tests for Left Panel', () => {
    let accordionElement;
    let accordionPanelElement;
    let animationBtn;
    let overallContainer;
    let overallPlaylistContainer;
    
    beforeEach(() => {
        document.body.innerHTML = html;  // Reset DOM before each test
        
        accordionElement = document.querySelector('.accordionButton');
        accordionPanelElement = accordionElement.nextElementSibling;
        animationBtn = document.querySelector('.animationBtn');
        overallContainer = document.querySelector('.overallContainer');
        overallPlaylistContainer = document.querySelector('.overallPlaylistContainer');
    });
    
    test('Accordion toggles active class and panel visibility', () => {
        // Ensure accordion starts without 'active' class
        expect(accordionElement).not.toHaveClass('active');
        
        // Simulate click on accordion
        fireEvent.click(accordionElement);
        expect(accordionElement).toHaveClass('accordionButton');
        expect(accordionPanelElement).toHaveClass('accordionPanel');
        
        // Simulate another click to toggle back
        fireEvent.click(accordionElement);
        expect(accordionElement).not.toHaveClass('active');
        expect(accordionPanelElement).not.toHaveClass('show');
    });

    test('Animation button toggles visibility of overallContainer', () => {
        // Initial state: hidden
        expect(overallContainer).toHaveStyle('display: block');
        
        // Click animation button to show overallContainer
        fireEvent.click(animationBtn);
        expect(overallContainer).toHaveStyle('display: block');
        
        // Click again to hide overallContainer
        fireEvent.click(animationBtn);
        setTimeout(() => {
            expect(overallContainer).toHaveStyle('display: none');
        }, 500);  // wait for animation timeout
    });


});