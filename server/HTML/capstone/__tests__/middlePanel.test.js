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

document.body.innerHTML = `
   <div class="mainContainer">
        <div class="albumContainer">
            <div class="album">
                <div id = "coverart"></div>
            </div>
        </div>
        <div class="textContainer">
            <h1 id ="title"></h1>
            <h2 id ="artist"></h2>
            <h2 id ="bitrate"></h2>
        </div>
        <div class="playerContainer">
            <div class="player">
                <div id="playtimePanel">
                    <div id="ctrlPlaytime"></div>
                    <div id="playbar">
                        <div id="ctrlProgress"></div>
                    </div>
                    <div id="ctrlRemainingTime"></div>
                </div>
                <!--<div id="ctrlProgress"></div>
                <div class="timeInfo">
                    <p class="playtime" id="playtime"></p>
                    <p class="maxtime" id="maxtime"></p>
                </div>-->
                <div class="buttons">
                    <div class="control">
                        <div id="repeatButton" class="repeatButtonInactive">   
                        </div>
                    </div>
                    <div class="control">
                        <div id="prevButton" class="prevButton">   
                        </div>
                    </div>
                    <div class="control">
                        <div id="playPause" class="">   
                        </div>
                    </div>
                    <div class="control">
                        <div id="nextButton" class="nextButton">   
                        </div>
                    </div>
                    <div class="control">
                        <div id="shuffleButton" class="shuffleButtonInactive">   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`

describe('Button functionality', () => {
    test('togglePause when play/pause is clicked', () => {
        const playPauseButton = document.getElementById('playPause');
        fireEvent.click(playPauseButton);
        expect(SqueezeJS.Controller.togglePause).toHaveBeenCalled();
    });
});