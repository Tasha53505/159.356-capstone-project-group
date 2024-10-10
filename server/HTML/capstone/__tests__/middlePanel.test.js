// Required code for Jest
const fs = require('fs');
const path = require('path');
const { screen, fireEvent } = require('@testing-library/dom');
require('@testing-library/jest-dom');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

global.SqueezeJS = {
    Controller: {
        togglePause: jest.fn()
    }
};

document.body.innerHTML = html;

describe('Button functions working', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('see if togglePause  works', () => {
        // Button exists
        const playPauseButton = document.getElementById('playPause');
        expect(playPauseButton).toBeInTheDocument();

        // Mock event listener
        playPauseButton.addEventListener('click', () => {
            SqueezeJS.Controller.togglePause();
        });

        // Checks if it works
        fireEvent.click(playPauseButton);
        expect(SqueezeJS.Controller.togglePause).toHaveBeenCalled();
    });
});